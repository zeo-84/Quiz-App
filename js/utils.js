const Utils = (() => {
    'use strict';
    function sanitizeHTML(s) { var d=document.createElement("div"); d.textContent=s; return d.innerHTML; }
    function formatTime(s) { return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); }
    function toPersianNumber(n) { var p=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]; return String(n).replace(/[0-9]/g,function(d){return p[d];}); }
    function generateId() { return Date.now().toString(36)+Math.random().toString(36).substr(2); }
    function calculatePercentage(v,t) { return t===0?0:Math.round((v/t)*100); }
    function showToast(msg,type,dur) {
        type=type||"info"; dur=dur||3000;
        var t=document.getElementById("toast"),m=document.getElementById("toast-message");
        if(!t||!m) return;
        m.textContent=msg; t.className="toast "+type;
        var ic=t.querySelector("i");
        if(ic) { var icons={success:"fas fa-check-circle",error:"fas fa-exclamation-circle",warning:"fas fa-exclamation-triangle",info:"fas fa-info-circle"}; ic.className=icons[type]||icons.info; }
        t.classList.add("show");
        setTimeout(function(){t.classList.remove("show");},dur);
    }
    function toggleLoading(s) { var o=document.getElementById("loading-overlay"); if(o) o.style.display=s?"flex":"none"; }
    function saveToStorage(k,d) { try{localStorage.setItem(k,JSON.stringify(d));}catch(e){} }
    function loadFromStorage(k) { try{var d=localStorage.getItem(k); return d?JSON.parse(d):null;}catch(e){return null;} }
    function formatDate(d) { return new Intl.DateTimeFormat("fa-IR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(d); }
    function deepClone(o) { return JSON.parse(JSON.stringify(o)); }
    return { sanitizeHTML:sanitizeHTML, formatTime:formatTime, toPersianNumber:toPersianNumber, generateId:generateId, calculatePercentage:calculatePercentage, showToast:showToast, toggleLoading:toggleLoading, saveToStorage:saveToStorage, loadFromStorage:loadFromStorage, formatDate:formatDate, deepClone:deepClone };
})();
