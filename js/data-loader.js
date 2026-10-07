const DataLoader = (() => {
    'use strict';
    function loadFromFile(file) {
        return new Promise(function(resolve,reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                try { resolve(parseQuizData(e.target.result)); }
                catch(err) { reject(new Error("خطا در خواندن فایل: "+err.message)); }
            };
            reader.onerror = function() { reject(new Error("خطا در خواندن فایل")); };
            reader.readAsText(file);
        });
    }
    function loadFromURL(url) {
        Utils.toggleLoading(true);
        return fetch(url).then(function(r) {
            if(!r.ok) throw new Error("HTTP "+r.status);
            return r.text();
        }).then(function(text) {
            Utils.toggleLoading(false);
            return parseQuizData(text);
        }).catch(function(err) {
            Utils.toggleLoading(false);
            throw new Error("خطا در بارگذاری: "+err.message);
        });
    }
    function parseQuizData(content) {
        var data;
        try { data = JSON.parse(content); }
        catch(e) { data = extractJSObject(content); }
        validateQuizData(data);
        return data;
    }
    function extractJSObject(code) {
        code = code.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"");
        var match = code.match(/(?:const|let|var)\s+\w+\s*=\s*(\{[\s\S]*\})/);
        if(match) { try { return new Function("return "+match[1])(); } catch(e) { throw new Error("فرمت نامعتبر"); } }
        throw new Error("داده آزمونی یافت نشد");
    }
    function validateQuizData(data) {
        if(!data||typeof data!=="object") throw new Error("دیتا باید آبجکت باشد");
        if(!data.title) throw new Error("عنوان الزامی است");
        if(!Array.isArray(data.questions)||data.questions.length===0) throw new Error("حداقل یک سوال الزامی است");
        data.questions.forEach(function(q,i) {
            if(!q.question) throw new Error("سوال "+(i+1)+": متن الزامی");
            if(!Array.isArray(q.options)||q.options.length<2) throw new Error("سوال "+(i+1)+": حداقل ۲ گزینه");
            if(typeof q.correct!=="number"||q.correct<0||q.correct>=q.options.length) throw new Error("سوال "+(i+1)+": پاسخ صحیح نامعتبر");
        });
    }
    function getSampleQuiz() {
        if(typeof quizData!=="undefined") return Utils.deepClone(quizData);
        return { title:"آزمون نمونه", questions:[{question:"پایتخت ایران؟",options:["اصفهان","تهران","شیراز","تبریز"],correct:1,explanation:"تهران پایتخت ایران است."}] };
    }
    return { loadFromFile:loadFromFile, loadFromURL:loadFromURL, getSampleQuiz:getSampleQuiz };
})();
