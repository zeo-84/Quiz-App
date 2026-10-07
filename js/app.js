const App = (() => {
  "use strict";
  var currentQuizData = null;

  function init() {
    setupEvents();
    UI.showScreen("screen-welcome");
  }

  function setupEvents() {
    document.getElementById("btn-home").addEventListener("click", function () {
      UI.showScreen("screen-welcome");
    });
    document
      .getElementById("btn-upload")
      .addEventListener("click", function () {
        UI.showScreen("screen-upload");
      });
    document
      .getElementById("btn-history")
      .addEventListener("click", function () {
        UI.renderHistory(QuizEngine.getHistory());
        UI.showScreen("screen-history");
      });
    document
      .getElementById("btn-library")
      .addEventListener("click", function () {
        loadLibrary();
        UI.showScreen("screen-library");
      });
    document
      .getElementById("btn-go-library")
      .addEventListener("click", function () {
        loadLibrary();
        UI.showScreen("screen-library");
      });
    document
      .getElementById("btn-start-sample")
      .addEventListener("click", startSample);
    document
      .getElementById("btn-upload-cta")
      .addEventListener("click", function () {
        UI.showScreen("screen-upload");
      });
    document.getElementById("btn-prev").addEventListener("click", function () {
      if (QuizEngine.prevQuestion()) renderQ();
    });
    document.getElementById("btn-next").addEventListener("click", function () {
      if (QuizEngine.nextQuestion()) renderQ();
    });
    document.getElementById("btn-submit").addEventListener("click", submitQuiz);
    document.getElementById("btn-retry").addEventListener("click", function () {
      if (currentQuizData) startQuiz(currentQuizData);
    });
    document
      .getElementById("btn-new-quiz")
      .addEventListener("click", function () {
        QuizEngine.reset();
        UI.showScreen("screen-welcome");
      });
    setupUpload();
  }

  function setupUpload() {
    var dz = document.getElementById("drop-zone"),
      fi = document.getElementById("file-input");
    dz.addEventListener("dragover", function (e) {
      e.preventDefault();
      dz.classList.add("dragover");
    });
    dz.addEventListener("dragleave", function () {
      dz.classList.remove("dragover");
    });
    dz.addEventListener("drop", function (e) {
      e.preventDefault();
      dz.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });
    fi.addEventListener("change", function (e) {
      if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });
    document
      .getElementById("btn-load-url")
      .addEventListener("click", function () {
        var u = document.getElementById("url-input").value.trim();
        if (!u) {
          Utils.showToast("URL را وارد کنید", "warning");
          return;
        }
        DataLoader.loadFromURL(u)
          .then(function (d) {
            startQuiz(d);
            Utils.showToast("بارگذاری شد", "success");
          })
          .catch(function (e) {
            Utils.showToast(e.message, "error");
          });
      });
  }

  function handleFile(f) {
    Utils.toggleLoading(true);
    DataLoader.loadFromFile(f)
      .then(function (d) {
        startQuiz(d);
        Utils.showToast("بارگذاری شد", "success");
      })
      .catch(function (e) {
        Utils.showToast(e.message, "error");
      })
      .finally(function () {
        Utils.toggleLoading(false);
      });
  }

  function startSample() {
    try {
      startQuiz(DataLoader.getSampleQuiz());
      Utils.showToast("آزمون نمونه", "success");
    } catch (e) {
      Utils.showToast("خطا", "error");
    }
  }

  function startQuiz(data) {
    currentQuizData = data;
    QuizEngine.init(data);
    UI.setQuizTitle(data.title);
    renderQ();
    UI.showScreen("screen-quiz");
  }

  function renderQ() {
    var q = QuizEngine.getCurrentQuestion();
    if (q) {
      UI.renderQuestion(
        q,
        QuizEngine.getCurrentIndex(),
        QuizEngine.getTotalQuestions(),
        QuizEngine.getSelectedAnswer()
      );
      UI.updateNavigation(
        QuizEngine.getCurrentIndex(),
        QuizEngine.getTotalQuestions()
      );
    }
  }

  function submitQuiz() {
    if (
      !QuizEngine.isComplete() &&
      !confirm("سوالات بدون پاسخ دارید. مطمئنید؟")
    )
      return;
    var r = QuizEngine.submit();
    UI.renderResults(r);
    UI.animateScore(r.score);
    UI.showScreen("screen-results");
  }

  // ─── Library System - FIXED VERSION ───
  async function loadLibrary() {
    try {
      console.log("Loading library...");

      // Load registry
      const registryResponse = await fetch("quizzes/registry.js");
      if (!registryResponse.ok) throw new Error("Registry not found");

      const registryText = await registryResponse.text();
      console.log("Registry loaded:", registryText);

      // Extract quiz files from registry
      const matches = registryText.match(/['"]([^'"]+\.js)['"]/g);
      if (!matches) {
        console.log("No quizzes in registry");
        UI.renderLibrary([]);
        return;
      }

      const quizFiles = matches.map((m) => m.replace(/['"]/g, ""));
      console.log("Quiz files:", quizFiles);

      // Load each quiz file
      const quizzes = [];
      for (const file of quizFiles) {
        try {
          const response = await fetch("quizzes/" + file);
          if (!response.ok) {
            console.warn("Failed to load:", file);
            continue;
          }

          const text = await response.text();

          // Extract quiz data using regex
          const dataMatch = text.match(/const\s+\w+\s*=\s*(\{[\s\S]*\});/);
          if (!dataMatch) {
            console.warn("No data found in:", file);
            continue;
          }

          // Parse the data
          const quizData = eval("(" + dataMatch[1] + ")");

          if (quizData && quizData.title && quizData.questions) {
            quizzes.push({
              file: file,
              title: quizData.title,
              count: quizData.questions.length,
              data: quizData,
            });
            console.log("Loaded quiz:", quizData.title);
          }
        } catch (err) {
          console.error("Error loading quiz:", file, err);
        }
      }

      console.log("Total quizzes loaded:", quizzes.length);
      UI.renderLibrary(quizzes);

      // Store quizzes for later use
      window._loadedQuizzes = quizzes;
    } catch (error) {
      console.error("Library load error:", error);
      UI.renderLibrary([]);
      Utils.showToast("خطا در بارگذاری کتابخانه: " + error.message, "error");
    }
  }

  function startLibraryQuiz(fileName) {
    const quizzes = window._loadedQuizzes || [];
    const quiz = quizzes.find((q) => q.file === fileName);

    if (quiz && quiz.data) {
      startQuiz(quiz.data);
      Utils.showToast("آزمون شروع شد", "success");
    } else {
      Utils.showToast("داده آزمون یافت نشد", "error");
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();

  return {
    init: init,
    startQuiz: startQuiz,
    startLibraryQuiz: startLibraryQuiz,
  };
})();
