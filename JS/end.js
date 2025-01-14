const btn = document.querySelector("button");
const input = document.querySelector("input");
const scoreElement = document.querySelector("p");

const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("HighScores")) || [];

scoreElement.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score };
    highScores.push(finalScore);
    highScores.sort((a, b) => a.score - b.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("Scores");
    window.location.assign("/");
  }
};

btn.addEventListener("click", saveHandler);
