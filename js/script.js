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
const timerCountDisplay = document.getElementById("timer-count");
const timerProgress = document.getElementById("timer-progress");

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
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<li>", "<ul>", "<list>"],
    correctIndex: 2, // <ul>
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
    ],
    correctIndex: 3, // Cascading Style Sheets
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font", "styles"],
    correctIndex: 1, // style
  },
  {
    question:
      "Which JavaScript method is used to write into the browser console?",
    options: [
      "console.print()",
      "console.log()",
      "window.log()",
      "browser.log()",
    ],
    correctIndex: 1, // console.log()
  },
  {
    question: "How do you select an element with id 'demo' in CSS?",
    options: [".demo", "demo", "#demo", "*demo"],
    correctIndex: 2, // #demo
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<picture>", "<src>", "<img>", "<image>"],
    correctIndex: 2, // <img>
  },
  {
    question: "Which property is used to change the font of an element in CSS?",
    options: ["font-style", "text-family", "font-family", "font-weight"],
    correctIndex: 2, // font-family
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction()",
      "function:myFunction()",
      "function = myFunction()",
      "new function()",
    ],
    correctIndex: 0, // function myFunction()
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    correctIndex: 2, // <h1>
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correctIndex: 2, // font-size
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    correctIndex: 2, // onclick
  },
  {
    question: "How do you make a list that lists items with numbers in HTML?",
    options: ["<ul>", "<dl>", "<ol>", "<list>"],
    correctIndex: 2, // <ol>
  },
  {
    question:
      "Which CSS property is used to create space around elements, outside of any defined borders?",
    options: ["padding", "spacing", "margin", "border-spacing"],
    correctIndex: 2, // margin
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: [
      "v carName;",
      "variable carName;",
      "let carName;",
      "declare carName;",
    ],
    correctIndex: 2, // let carName;
  },
  {
    question: "Which HTML tag is used to define a table row?",
    options: ["<td>", "<th>", "<table>", "<tr>"],
    correctIndex: 3, // <tr>
  },
];

const QUESTIONS_PER_QUIZ = 5;
const TIME_LIMIT_PER_QUESTION = 20;
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft;
let timerInterval = null;

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

function startTimer() {
  timeLeft = TIME_LIMIT_PER_QUESTION;
  updateTimerDisplay();

  clearTimer();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval != null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleTimeout() {
  const correctIndex = shuffledQuestions[currentQuestionIndex].correctIndex;
  optionButtons.forEach((btn) => (btn.disabled = true));
  optionButtons[correctIndex].classList.add("correct");
  setTimeout(nextQuestion, 1500);
}

function updateTimerDisplay() {
  timerCountDisplay.textContent = timeLeft;
  const timerPercent = (timeLeft / TIME_LIMIT_PER_QUESTION) * 100;
  timerProgress.style.width = `${timerPercent}%`;

  timerCountDisplay.setAttribute("aria-label", `${timeLeft} seconds remaining`);

  timerProgress.classList.remove(
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    "shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    "shadow-[0_0_10px_rgba(239,68,68,0.5)]"
  );

  if (timeLeft <= 5) {
    timerProgress.classList.add(
      "bg-red-500",
      "shadow-[0_0_10px_rgba(239,68,68,0.5)]"
    );
  } else if (timeLeft <= 10) {
    timerProgress.classList.add(
      "bg-orange-500",
      "shadow-[0_0_10px_rgba(249,115,22,0.5)]"
    );
  } else {
    timerProgress.classList.add(
      "bg-green-500",
      "shadow-[0_0_10px_rgba(34,197,94,0.5)]"
    );
  }
}

function showScreen(screen) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  screen.classList.add("active");
}

function startQuiz() {
  clearTimer();

  if (!questions || questions.length === 0) {
    alert("No questions available!");
    showScreen(startScreen);
    return;
  }

  if (questions.length < QUESTIONS_PER_QUIZ) {
    alert(`Error: Need at least ${QUESTIONS_PER_QUIZ} questions in the pool`);
    return;
  }

  shuffledQuestions = shuffleArray(questions).slice(0, QUESTIONS_PER_QUIZ);

  if (!shuffledQuestions || shuffledQuestions.length === 0) {
    alert("Failed to load questions. please try again.");
    showScreen(startScreen);
    return;
  }

  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  optionButtons.forEach((btn, index) => {
    btn.textContent = currentQuestion.options[index];
    btn.classList.remove("correct", "wrong");
    btn.disabled = false;
  });

  currentQuestionDisplay.textContent = currentQuestionIndex + 1;
  totalQuestionsDisplay.textContent = shuffledQuestions.length;
  currentScoreDisplay.textContent = score;

  const progressPercent =
    ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  timerProgress.classList.remove(
    "bg-red-500",
    "bg-orange-500",
    "bg-green-500",
    "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    "shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    "shadow-[0_0_10px_rgba(34,197,94,0.5)]"
  );
  timerProgress.classList.add("bg-green-500");
}

optionButtons.forEach((btn) => {
  btn.addEventListener("click", handleAnswerClick);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAnswerClick(e);
    }
  });
});

function handleAnswerClick(e) {
  clearTimer();

  const selectedBtn = e.target;
  const selectedIndex = Number(selectedBtn.dataset.index);
  const correctIndex = shuffledQuestions[currentQuestionIndex].correctIndex;

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

  if (currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
    startTimer();
  } else {
    showResult();
  }
}

function showResult() {
  clearTimer();

  showScreen(resultScreen);

  finalScoreDisplay.textContent = score;
  questionsCountDisplay.textContent = shuffledQuestions.length;

  let message = "";

  if (score === shuffledQuestions.length) {
    message = "Excellent! Perfect score 🎉";
    resultMessage.classList.add("good");
  } else if (score >= shuffledQuestions.length / 2) {
    message = "Good effort! Keep practicing 👍";

    resultMessage.classList.add("average");
  } else {
    message = "Don't worry, try again 💪";
    resultMessage.classList.add("bad");
  }

  resultMessage.textContent = message;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffledQuestions = [];
  clearTimer();

  timerProgress.style.width = "100%";
  timerCountDisplay.textContent = TIME_LIMIT_PER_QUESTION;
  timerProgress.classList.remove(
    "bg-red-500",
    "bg-orange-500",
    "bg-green-500",
    "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    "shadow-[0_0_10px_rgba(249,115,22,0.5)]",
    "shadow-[0_0_10px_rgba(34,197,94,0.5)]"
  );

  timerProgress.classList.add("bg-green-500");
  resultMessage.classList.remove("good", "bad", "average");
}

startBtn.addEventListener("click", () => {
  resetQuiz();
  showScreen(quizScreen);
  startQuiz();
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
  showScreen(startScreen);
});

showScreen(startScreen);
