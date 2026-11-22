/**
 * QUIZ.JS - HỆ THỐNG ĐỐ VUI ÔN TẬP LỊCH SỬ ĐẢNG (INTERACTIVE QUIZ)
 * Phụ trách bởi Minh (Vibecode)
 */

const QuizModule = (() => {
  const letters = ["A", "B", "C", "D"];
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  let questionCardEl, resultScreenEl;
  let stageIndicatorEl, questionTextEl, optionsListEl, explanationBoxEl, explanationTextEl, answerFeedbackEl;
  let nextBtnEl;
  let progressFillEl, questionCounterEl, scoreDisplayEl;

  function init() {
    questionCardEl = document.getElementById("quizQuestionCard");
    resultScreenEl = document.getElementById("quizResultScreen");
    stageIndicatorEl = document.getElementById("quizStageIndicator");
    questionTextEl = document.getElementById("quizQuestionText");
    optionsListEl = document.getElementById("quizOptionsList");
    explanationBoxEl = document.getElementById("quizExplanationBox");
    explanationTextEl = document.getElementById("quizExplanationText");
    answerFeedbackEl = document.getElementById("quizAnswerFeedback");
    nextBtnEl = document.getElementById("quizNextBtn");
    progressFillEl = document.getElementById("quizProgressFill");
    questionCounterEl = document.getElementById("quizQuestionCounter");
    scoreDisplayEl = document.getElementById("quizScoreDisplay");

    if (nextBtnEl) {
      nextBtnEl.addEventListener("click", handleNextQuestion);
    }

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
    if (optionsListEl) {
      const optionButtons = currentQ.options.map((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option-btn";

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = letters[index];

        const text = document.createElement("span");
        text.className = "option-text";
        text.textContent = option;

        button.append(letter, text);
        button.addEventListener("click", () => handleSelectOption(index));
        return button;
      });
      optionsListEl.replaceChildren(...optionButtons);
    }
  }

  function handleSelectOption(selectedIndex) {
    if (answered) return;
    answered = true;

    const currentQ = quizData[currentIndex];
    const optionBtns = optionsListEl.querySelectorAll(".quiz-option-btn");
    const isCorrect = selectedIndex === currentQ.answer;

    // Vô hiệu hóa tất cả lựa chọn
    optionBtns.forEach(btn => btn.disabled = true);

    optionBtns[currentQ.answer].classList.add("correct");
    if (isCorrect) {
      score += 1;
    } else {
      optionBtns[selectedIndex].classList.add("wrong");
    }

    // Cập nhật điểm
    if (scoreDisplayEl) scoreDisplayEl.textContent = `Điểm: ${score}`;
    if (progressFillEl) progressFillEl.style.width = `${((currentIndex + 1) / quizData.length) * 100}%`;

    // Hiển thị hộp giải thích
    if (answerFeedbackEl) {
      answerFeedbackEl.textContent = isCorrect ? "Chính xác!" : `Chưa đúng. Đáp án đúng là ${letters[currentQ.answer]}.`;
    }
    if (explanationTextEl) explanationTextEl.textContent = currentQ.explanation;
    if (explanationBoxEl) explanationBoxEl.classList.add("visible");

    // Hiển thị nút tiếp theo hoặc xem kết quả
    if (nextBtnEl) {
      nextBtnEl.style.display = "inline-flex";
      nextBtnEl.textContent = (currentIndex === quizData.length - 1) ? "Xem kết quả ➔" : "Câu tiếp theo ➔";
      nextBtnEl.focus({ preventScroll: true });
    }
  }

  function handleNextQuestion() {
    if (!answered) return;

    if (currentIndex < quizData.length - 1) {
      currentIndex++;
      loadQuestion();
      questionTextEl?.focus();
    } else {
      answered = false;
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

    let trophy = "";
    let message = "";

    if (ratio >= 0.85) {
      trophy = "🏆";
      message = "Xuất sắc! Bạn đã nắm rất vững và sâu sắc đường lối của Đảng và các mốc son lịch sử vẻ vang giai đoạn 1954 - 1975.";
    } else if (ratio >= 0.6) {
      trophy = "⭐";
      message = "Rất tốt! Bạn đã hiểu được các sự kiện và chỉ đạo cơ bản. Hãy khám phá thêm kho tư liệu bảo tàng để hoàn thiện kiến thức nhé!";
    } else {
      message = "Bạn đã hoàn thành thử thách! Đừng ngần ngại xem lại các slide thuyết trình 5 giai đoạn để củng cố thêm các kiến thức trọng tâm.";
    }

    if (trophyEl) {
      trophyEl.textContent = trophy;
      trophyEl.hidden = !trophy;
    }
    if (feedbackEl) feedbackEl.textContent = message;
    document.getElementById("quizResultTitle")?.focus();
  }

  return { init };
})();
