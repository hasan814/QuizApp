import { formatData } from "./helper.js";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const loader = document.getElementById("loader");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("next-button");
const container = document.getElementById("container");
const answerList = document.querySelectorAll(".answer-list");
const questionText = document.getElementById("question-text");
const FinishedBtns = document.getElementById("finished-button");
const questionNumber = document.getElementById("question-number");

let score = 0;
let correctAnswer;
let formattedData;
let isAccepted = true;
let questionIndex = 0;

const CORRECT_BONUS = 10;

const fetchData = async () => {
  const response = await fetch(URL);
  const responseData = await response.json();
  formattedData = formatData(responseData.results);
  start();
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

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length)
    (isAccepted = true), removeClasses(), showQuestion();
  else window.location.assign("/end.html");
};

const removeClasses = () => {
  answerList.forEach((btn) => (btn.className = "answer-list"));
};

window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler);
answerList.forEach((btn, index) => {
  btn.addEventListener("click", (event) => checkAnswer(event, index));
});
