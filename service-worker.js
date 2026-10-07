// Quiz-App Service Worker
const CACHE_NAME = 'quiz-app-v3';
const VERSION = '1.0.2';

const STATIC_ASSETS = [
    './', './index.html', './css/style.css', './css/mobile-fix.css',
    './css/nav-enhancement.css', './js/utils.js', './js/data-loader.js',
    './js/quiz-engine.js', './js/ui.js', './js/app.js',
    './js/mobile-optimizer.js', './data/sample-quiz.js', './quizzes/registry.js'
];

self.addEventListener('install', (event) => {
    console.log('[SW] Installing version:', VERSION);
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating version:', VERSION);
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    }).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('/quizzes/') && !event.request.url.includes('registry.js')) {
        event.respondWith(fetch(event.request).then((response) => {
            if (response.ok) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
        }).catch(() => caches.match(event.request)));
        return;
    }
    event.respondWith(caches.match(event.request).then((cached) => {
        if (cached) {
            fetch(event.request).then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
            }).catch(() => {});
            return cached;
        }
        return fetch(event.request);
    }));
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') self.skipWaiting();
    if (event.data === 'CLEAR_CACHE') {
        caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))));
    }
});
