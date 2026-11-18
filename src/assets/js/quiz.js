/**
 * QUIZ.JS - HỆ THỐNG ĐỐ VUI ÔN TẬP LỊCH SỬ ĐẢNG (INTERACTIVE QUIZ)
 * Phụ trách bởi Minh (Vibecode)
 */

const QuizModule = (() => {
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  let questionCardEl, resultScreenEl;
  let stageIndicatorEl, questionTextEl, optionsListEl, explanationBoxEl, explanationTextEl;
  let nextBtnEl, restartBtnEl;
  let progressFillEl, questionCounterEl, scoreDisplayEl;

  function init() {
    questionCardEl = document.getElementById("quizQuestionCard");
    resultScreenEl = document.getElementById("quizResultScreen");
    stageIndicatorEl = document.getElementById("quizStageIndicator");
    questionTextEl = document.getElementById("quizQuestionText");
    optionsListEl = document.getElementById("quizOptionsList");
    explanationBoxEl = document.getElementById("quizExplanationBox");
    explanationTextEl = document.getElementById("quizExplanationText");
    nextBtnEl = document.getElementById("quizNextBtn");
    restartBtnEl = document.getElementById("quizRestartBtn");
    progressFillEl = document.getElementById("quizProgressFill");
    questionCounterEl = document.getElementById("quizQuestionCounter");
    scoreDisplayEl = document.getElementById("quizScoreDisplay");

    if (nextBtnEl) {
      nextBtnEl.addEventListener("click", handleNextQuestion);
    }
    if (restartBtnEl) {
      restartBtnEl.addEventListener("click", restartQuiz);
    }

    startQuiz();
  }

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;

    if (resultScreenEl) resultScreenEl.style.display = "none";
    if (questionCardEl) questionCardEl.style.display = "block";

    loadQuestion();
  }

  function loadQuestion() {
    answered = false;
    const currentQ = quizData[currentIndex];
    if (!currentQ) return;

    // Cập nhật chỉ số câu & điểm
    if (questionCounterEl) questionCounterEl.textContent = `Câu ${currentIndex + 1} / ${quizData.length}`;
    if (scoreDisplayEl) scoreDisplayEl.textContent = `Điểm: ${score}`;
    if (progressFillEl) {
      const pct = (currentIndex / quizData.length) * 100;
      progressFillEl.style.width = `${pct}%`;
    }

    // Cập nhật nội dung câu hỏi
    if (stageIndicatorEl) stageIndicatorEl.textContent = `Thời kỳ: ${currentQ.stage}`;
    if (questionTextEl) questionTextEl.textContent = currentQ.question;

    // Ẩn giải thích và nút Tiếp theo
    if (explanationBoxEl) explanationBoxEl.classList.remove("visible");
    if (nextBtnEl) nextBtnEl.style.display = "none";

    // Render danh sách lựa chọn
    const letters = ["A", "B", "C", "D"];
    if (optionsListEl) {
      optionsListEl.innerHTML = currentQ.options.map((opt, i) => `
        <button class="quiz-option-btn" data-index="${i}">
          <span class="option-letter">${letters[i]}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join("");

      optionsListEl.querySelectorAll(".quiz-option-btn").forEach(btn => {
        btn.addEventListener("click", () => handleSelectOption(parseInt(btn.getAttribute("data-index"), 10)));
      });
    }
  }

  function handleSelectOption(selectedIndex) {
    if (answered) return;
    answered = true;

    const currentQ = quizData[currentIndex];
    const optionBtns = optionsListEl.querySelectorAll(".quiz-option-btn");

    // Vô hiệu hóa tất cả lựa chọn
    optionBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQ.answer) {
      // Đúng
      score += 1;
      optionBtns[selectedIndex].classList.add("correct");
    } else {
      // Sai
      optionBtns[selectedIndex].classList.add("wrong");
      optionBtns[currentQ.answer].classList.add("correct");
    }

    // Cập nhật điểm
    if (scoreDisplayEl) scoreDisplayEl.textContent = `Điểm: ${score}`;

    // Hiển thị hộp giải thích
    if (explanationTextEl) explanationTextEl.textContent = currentQ.explanation;
    if (explanationBoxEl) explanationBoxEl.classList.add("visible");

    // Hiển thị nút tiếp theo hoặc xem kết quả
    if (nextBtnEl) {
      nextBtnEl.style.display = "inline-flex";
      nextBtnEl.textContent = (currentIndex === quizData.length - 1) ? "Xem kết quả tổng kết ➔" : "Câu tiếp theo ➔";
    }
  }

  function handleNextQuestion() {
    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    if (questionCardEl) questionCardEl.style.display = "none";
    if (resultScreenEl) resultScreenEl.style.display = "block";

    if (progressFillEl) progressFillEl.style.width = "100%";

    const finalScoreEl = document.getElementById("resultScoreHighlight");
    const feedbackEl = document.getElementById("resultFeedback");
    const trophyEl = document.getElementById("resultTrophy");

    const total = quizData.length;
    const ratio = score / total;

    if (finalScoreEl) finalScoreEl.textContent = `${score} / ${total}`;

    let trophy = "🎖️";
    let message = "";

    if (ratio >= 0.85) {
      trophy = "🏆";
      message = "Xuất sắc! Bạn đã nắm rất vững và sâu sắc đường lối của Đảng và các mốc son lịch sử vẻ vang giai đoạn 1954 - 1975.";
    } else if (ratio >= 0.6) {
      trophy = "⭐";
      message = "Rất tốt! Bạn đã hiểu được các sự kiện và chỉ đạo cơ bản. Hãy khám phá thêm kho tư liệu bảo tàng để hoàn thiện kiến thức nhé!";
    } else {
      trophy = "📖";
      message = "Bạn đã hoàn thành thử thách! Đừng ngần ngại xem lại các slide thuyết trình 5 giai đoạn để củng cố thêm các kiến thức trọng tâm.";
    }

    if (trophyEl) trophyEl.textContent = trophy;
    if (feedbackEl) feedbackEl.textContent = message;
  }

  function restartQuiz() {
    startQuiz();
  }

  return { init };
})();
