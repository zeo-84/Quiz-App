/**
 * Mobile Optimizer
 * Dynamically optimizes UI for mobile devices
 */
(function() {
    'use strict';

    function isMobile() {
        return window.innerWidth <= 768 ||
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function optimizeForMobile() {
        if (!isMobile()) return;

        console.log('Mobile optimizer activated');

        // Add mobile class to body
        document.body.classList.add('mobile-optimized');

        // Optimize touch targets
        var buttons = document.querySelectorAll('button, .nav-btn, .option-item, .library-item');
        buttons.forEach(function(btn) {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
        });

        // Prevent zoom on input focus (iOS)
        var inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                var meta = document.querySelector('meta[name=viewport]');
                if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
            input.addEventListener('blur', function() {
                var meta = document.querySelector('meta[name=viewport]');
                if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
            });
        });

        // Smooth scroll for better UX
        document.documentElement.style.scrollBehavior = 'smooth';

        // Optimize images and icons
        var icons = document.querySelectorAll('i.fas, i.far, i.fab');
        icons.forEach(function(icon) {
            icon.style.webkitFontSmoothing = 'antialiased';
            icon.style.mozOsxFontSmoothing = 'grayscale';
        });
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeForMobile);
    } else {
        optimizeForMobile();
    }

    // Run on resize
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (isMobile()) {
                document.body.classList.add('mobile-optimized');
            } else {
                document.body.classList.remove('mobile-optimized');
            }
        }, 250);
    });
})();
