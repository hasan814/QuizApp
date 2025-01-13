import { formatData } from "./helper.js";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const loader = document.getElementById("loader");
const container = document.getElementById("container");

let formattedData;

const fetchData = async () => {
  const response = await fetch(URL);
  const responseData = await response.json();
  formattedData = formatData(responseData.results);
  start();
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
