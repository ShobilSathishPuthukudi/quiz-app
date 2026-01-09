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
    question: "What is the capital of France",
    options: ["London", "Berlin", "paris", "Madrid"],
    correctIndex: 2,
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctIndex: 3,
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language",
    ],
    correctIndex: 1,
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

  optionButtons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.classList.remove("correct", "wrong");
    button.disabled = false;
  });

  currentQuestionDisplay.textContent = currentQuestionIndex + 1;
  totalQuestionsDisplay.textContent = questions.length;
  currentScoreDisplay.textContent = score;

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

optionButtons.forEach((button) => {
  button.addEventListener("click", handleAnswerClick);
});

function handleAnswerClick(e) {
  const selectedButton = e.target;
  const selectedIndex = Number(selectedButton.dataset.index);
  const correctIndex = questions[currentQuestionIndex].correctIndex;

  optionButtons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === correctIndex) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
    optionButtons[correctIndex].classList.add("correct");
  }

  currentStextContent = score;

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
