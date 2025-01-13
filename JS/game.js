import { checkAnswer, formatData } from "./helper.js";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const answerList = document.querySelectorAll(".answer-list");
const questionText = document.getElementById("question-text");

let correctAnswer;
let formattedData;
let questionIndex = 0;

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
  questionText.innerText = question;
  answerList.forEach((btn, index) => {
    btn.innerText = answers[index];
  });
};

window.addEventListener("load", fetchData);
answerList.forEach((btn, index) => {
  btn.addEventListener("click", checkAnswer);
});
