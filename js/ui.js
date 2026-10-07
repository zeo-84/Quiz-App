const UI = (() => {
    'use strict';
    function showScreen(id) {
        document.querySelectorAll(".screen").forEach(function(s){s.classList.remove("active");});
        var t=document.getElementById(id); if(t) t.classList.add("active");
        document.querySelectorAll(".nav-btn").forEach(function(b){b.classList.remove("active");});
        var map={"screen-welcome":"btn-home","screen-library":"btn-library","screen-upload":"btn-upload","screen-history":"btn-history"};
        if(map[id]) { var nb=document.getElementById(map[id]); if(nb) nb.classList.add("active"); }
    }
    function renderQuestion(q,idx,total,sel) {
        var area=document.getElementById("question-area");
        var counter=document.getElementById("question-counter");
        var bar=document.getElementById("progress-bar");
        if(!area) return;
        if(counter) counter.textContent="سوال "+Utils.toPersianNumber(idx+1)+" از "+Utils.toPersianNumber(total);
        if(bar) { var p=((idx+1)/total)*100; bar.style.width=p+"%"; }
        var letters=["الف","ب","ج","د","ه","و","ز","ح"];
        var html='<div class="question-text">'+Utils.sanitizeHTML(q.question)+'</div><div class="options-list">';
        q.options.forEach(function(opt,oi) {
            var cls=sel===oi?" selected":"";
            html+='<div class="option-item'+cls+'" data-index="'+oi+'" role="button" tabindex="0">';
            html+='<div class="option-letter">'+letters[oi]+'</div>';
            html+='<div class="option-text">'+Utils.sanitizeHTML(opt)+'</div></div>';
        });
        html+='</div>';
        area.innerHTML=html;
        area.querySelectorAll(".option-item").forEach(function(item) {
            item.addEventListener("click",function() {
                var oi=parseInt(item.dataset.index);
                QuizEngine.selectAnswer(oi);
                renderQuestion(q,idx,total,oi);
            });
        });
    }
    function updateNavigation(idx,total) {
        var bp=document.getElementById("btn-prev"),bn=document.getElementById("btn-next"),bs=document.getElementById("btn-submit");
        if(bp) bp.disabled=idx===0;
        if(bn&&bs) { if(idx===total-1){bn.style.display="none";bs.style.display="inline-flex";}else{bn.style.display="inline-flex";bs.style.display="none";} }
    }
    function renderResults(r) {
        var sv=document.getElementById("score-value"),sp=document.getElementById("score-progress-circle");
        if(sv) sv.textContent=Utils.toPersianNumber(r.score);
        if(sp) { var c=2*Math.PI*90; sp.style.strokeDashoffset=c-(r.score/100)*c; }
        var sc=document.getElementById("stat-correct"),sw=document.getElementById("stat-wrong"),su=document.getElementById("stat-unanswered"),st=document.getElementById("stat-time");
        if(sc) sc.textContent=Utils.toPersianNumber(r.correct);
        if(sw) sw.textContent=Utils.toPersianNumber(r.wrong);
        if(su) su.textContent=Utils.toPersianNumber(r.unanswered);
        if(st) st.textContent=Utils.formatTime(r.timeSpent);
        var container=document.getElementById("answer-sheet-content");
        if(!container) return;
        var html="";
        r.details.forEach(function(d,i) {
            var cls=d.isUnanswered?"unanswered":(d.isCorrect?"correct":"wrong");
            var stxt=d.isUnanswered?"بدون پاسخ":(d.isCorrect?"صحیح":"غلط");
            var icon=d.isCorrect?"check":(d.isUnanswered?"minus":"times");
            html+='<div class="answer-item '+cls+'">';
            html+='<div class="answer-question">'+Utils.toPersianNumber(i+1)+". "+Utils.sanitizeHTML(d.question)+'</div>';
            html+='<div class="answer-details">';
            html+='<span><i class="fas fa-'+icon+'"></i> وضعیت: '+stxt+'</span>';
            if(!d.isUnanswered&&!d.isCorrect) html+='<span><i class="fas fa-times-circle" style="color:var(--danger)"></i> پاسخ شما: '+Utils.sanitizeHTML(d.options[d.userAnswer])+'</span>';
            html+='<span><i class="fas fa-check-circle" style="color:var(--success)"></i> پاسخ صحیح: '+Utils.sanitizeHTML(d.options[d.correctAnswer])+'</span>';
            if(d.explanation) html+='<div class="explanation"><strong><i class="fas fa-lightbulb"></i> توضیح:</strong> '+Utils.sanitizeHTML(d.explanation)+'</div>';
            html+='</div></div>';
        });
        container.innerHTML=html;
    }
    function renderHistory(history) {
        var list=document.getElementById("history-list"),empty=document.getElementById("empty-history");
        if(!list||!empty) return;
        if(history.length===0) { list.style.display="none"; empty.style.display="block"; return; }
        list.style.display="flex"; empty.style.display="none";
        var html="";
        history.forEach(function(h) {
            html+='<div class="history-item"><div class="history-info"><div class="history-title">'+Utils.sanitizeHTML(h.title)+'</div><div class="history-date">'+Utils.formatDate(new Date(h.timestamp))+'</div></div><div class="history-score">'+Utils.toPersianNumber(h.score)+'%</div></div>';
        });
        list.innerHTML=html;
    }
    function renderLibrary(quizzes) {
      var list = document.getElementById("library-list"),
        empty = document.getElementById("empty-library");
      if (!list || !empty) return;

      console.log("Rendering library with", quizzes.length, "quizzes");

      if (!quizzes || quizzes.length === 0) {
        list.style.display = "none";
        empty.style.display = "block";
        return;
      }

      list.style.display = "grid";
      empty.style.display = "none";

      var icons = [
        "fa-calculator",
        "fa-flask",
        "fa-landmark",
        "fa-code",
        "fa-globe",
        "fa-atom",
        "fa-pen",
        "fa-book",
      ];
      var html = "";

      quizzes.forEach(function (q, i) {
        html += '<div class="library-item" data-file="' + q.file + '">';
        html +=
          '<div class="library-item-icon"><i class="fas ' +
          icons[i % icons.length] +
          '"></i></div>';
        html +=
          '<div class="library-item-title">' +
          Utils.sanitizeHTML(q.title) +
          "</div>";
        html +=
          '<div class="library-item-count">' +
          Utils.toPersianNumber(q.count) +
          " سوال</div>";
        html +=
          '<button class="library-item-btn"><i class="fas fa-play"></i> شروع آزمون</button>';
        html += "</div>";
      });

      list.innerHTML = html;

      list.querySelectorAll(".library-item").forEach(function (item) {
        item.addEventListener("click", function () {
          App.startLibraryQuiz(item.dataset.file);
        });
      });
    }
    function setQuizTitle(t) { var e=document.getElementById("current-quiz-title"); if(e) e.textContent=t; }
    function animateScore(target) {
        var sv=document.getElementById("score-value"); if(!sv) return;
        var cur=0,inc=target/50;
        var t=setInterval(function() { cur+=inc; if(cur>=target){cur=target;clearInterval(t);} sv.textContent=Utils.toPersianNumber(Math.round(cur)); },30);
    }
    return { showScreen:showScreen, renderQuestion:renderQuestion, updateNavigation:updateNavigation, renderResults:renderResults, renderHistory:renderHistory, renderLibrary:renderLibrary, setQuizTitle:setQuizTitle, animateScore:animateScore };
})();
