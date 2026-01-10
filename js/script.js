//Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

//Buttons
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

//Quiz elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.querySelector(".options");
const optionButtons = document.querySelectorAll(".option");

//Quiz info
const currentQuestionDisplay = document.getElementById("current-question");
const totalQuestionsDisplay = document.getElementById("total-questions");
const currentScoreDisplay = document.getElementById("current-score");
const progressBar = document.getElementById("progress");

//Result elements
const finalScoreDisplay = document.getElementById("final-score");
const questionsCountDisplay = document.getElementById("questions-count");
const resultMessage = document.getElementById("result-message");

const questions = [
  {
    question: "Which HTML tag is used for creating a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctIndex: 1, // <a>
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctIndex: 3, // JavaScript
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    correctIndex: 1, // Hyper Text Markup Language
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctIndex: 2, // color
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "--"],
    correctIndex: 0, // //
  },
];

let currentQuestionIndex = 0;
let score = 0;

function showScreen(screen) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  screen.classList.add("active");
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  optionButtons.forEach((btn, index) => {
    btn.textContent = currentQuestion.options[index];
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });

  currentQuestionDisplay.textContent = currentQuestionIndex + 1;
  totalQuestionsDisplay.textContent = questions.length;
  currentScoreDisplay.textContent = score;

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

optionButtons.forEach((btn) => {
  btn.addEventListener("click", handleAnswerClick);
});

function handleAnswerClick(e) {
  const selectedBtn = e.target;
  const selectedIndex = Number(selectedBtn.dataset.index);
  const correctIndex = questions[currentQuestionIndex].correctIndex;

  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    optionButtons[correctIndex].classList.add("correct");
  }

  currentScoreDisplay.textContent = score;

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);

  finalScoreDisplay.textContent = score;
  questionsCountDisplay.textContent = questions.length;

  let message = "";

  if (score === questions.length) {
    message = "Excellent! Perfect score 🎉";
    resultMessage.classList.add("good");
  } else if (score >= questions.length / 2) {
    message = "Good effort! Keep practicing 👍";
    resultMessage.classList.add("average");
  } else {
    message = "Don't worry, try again 💪";
    resultMessage.classList.add("bad");
  }

  resultMessage.textContent = message;
}

startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  showScreen(startScreen);
});

showScreen(startScreen);
