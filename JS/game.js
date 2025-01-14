import { formatData } from "./helper.js";

const loader = document.getElementById("loader");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("next-button");
const container = document.getElementById("container");
const answerList = document.querySelectorAll(".answer-list");
const questionText = document.getElementById("question-text");
const FinishedBtn = document.getElementById("finished-button");
const questionNumber = document.getElementById("question-number");

const level = localStorage.getItem("level") || "medium";

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let score = 0;
let correctAnswer;
let formattedData;
let isAccepted = true;
let questionIndex = 0;

const CORRECT_BONUS = 10;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const responseData = await response.json();
    formattedData = formatData(responseData.results);
    start();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((btn, index) => {
    btn.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect)
    event.target.classList.add("correct"),
      (score += CORRECT_BONUS),
      (scoreText.innerText = score);
  else
    event.target.classList.add("incorrect"),
      answerList[correctAnswer].classList.add("correct");
};

const finishedHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

const nextHandler = () => {
  questionIndex++;

  if (questionIndex < 10) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishedHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((btn) => (btn.className = "answer-list"));
};

window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler);
FinishedBtn.addEventListener("click", finishedHandler);
answerList.forEach((btn, index) => {
  btn.addEventListener("click", (event) => checkAnswer(event, index));
});
