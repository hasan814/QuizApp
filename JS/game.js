import { formatData } from "./helper.js";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const loader = document.getElementById("loader");
const scoreText = document.getElementById("score");
const container = document.getElementById("container");
const answerList = document.querySelectorAll(".answer-list");
const questionText = document.getElementById("question-text");

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

window.addEventListener("load", fetchData);
answerList.forEach((btn, index) => {
  btn.addEventListener("click", (event) => checkAnswer(event, index));
});
