const QuizEngine = (() => {
    'use strict';
    var state = { quizData:null, currentQuestion:0, answers:[], startTime:null, endTime:null, timerInterval:null };
    function init(data) {
        state.quizData = Utils.deepClone(data);
        state.currentQuestion = 0;
        state.answers = new Array(data.questions.length).fill(null);
        state.startTime = Date.now();
        state.endTime = null;
        if(state.timerInterval) clearInterval(state.timerInterval);
        state.timerInterval = setInterval(function() {
            var el = Math.floor((Date.now()-state.startTime)/1000);
            var t = document.getElementById("timer");
            if(t) t.textContent = Utils.formatTime(el);
        }, 1000);
    }
    function stopTimer() { if(state.timerInterval){clearInterval(state.timerInterval);state.timerInterval=null;} state.endTime=Date.now(); }
    function getCurrentQuestion() { return state.quizData?state.quizData.questions[state.currentQuestion]:null; }
    function getCurrentIndex() { return state.currentQuestion; }
    function getTotalQuestions() { return state.quizData?state.quizData.questions.length:0; }
    function selectAnswer(i) { state.answers[state.currentQuestion]=i; }
    function getSelectedAnswer() { return state.answers[state.currentQuestion]; }
    function nextQuestion() { if(state.currentQuestion<state.quizData.questions.length-1){state.currentQuestion++;return true;} return false; }
    function prevQuestion() { if(state.currentQuestion>0){state.currentQuestion--;return true;} return false; }
    function isComplete() { return state.answers.every(function(a){return a!==null;}); }
    function getQuizData() { return state.quizData?Utils.deepClone(state.quizData):null; }
    function submit() {
        stopTimer();
        var correct=0,wrong=0,unanswered=0;
        var details = state.quizData.questions.map(function(q,i) {
            var ua=state.answers[i], ic=ua===q.correct, iu=ua===null;
            if(iu) unanswered++; else if(ic) correct++; else wrong++;
            return { question:q.question, options:q.options, correctAnswer:q.correct, userAnswer:ua, isCorrect:ic, isUnanswered:iu, explanation:q.explanation||"" };
        });
        var total=state.quizData.questions.length;
        var results = { title:state.quizData.title, totalQuestions:total, correct:correct, wrong:wrong, unanswered:unanswered, score:Utils.calculatePercentage(correct,total), timeSpent:Math.floor((state.endTime-state.startTime)/1000), details:details, timestamp:Date.now() };
        var history = Utils.loadFromStorage("quizHistory")||[];
        history.unshift({ id:Utils.generateId(), title:results.title, score:results.score, totalQuestions:total, correct:correct, timeSpent:results.timeSpent, timestamp:results.timestamp });
        if(history.length>50) history.pop();
        Utils.saveToStorage("quizHistory",history);
        return results;
    }
    function getHistory() { return Utils.loadFromStorage("quizHistory")||[]; }
    function reset() { stopTimer(); state={quizData:null,currentQuestion:0,answers:[],startTime:null,endTime:null,timerInterval:null}; }
    return { init:init, getCurrentQuestion:getCurrentQuestion, getCurrentIndex:getCurrentIndex, getTotalQuestions:getTotalQuestions, selectAnswer:selectAnswer, getSelectedAnswer:getSelectedAnswer, nextQuestion:nextQuestion, prevQuestion:prevQuestion, isComplete:isComplete, submit:submit, getHistory:getHistory, reset:reset, getQuizData:getQuizData };
})();
