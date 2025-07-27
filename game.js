const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

let levelTitle = document.querySelector("h1");

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function(event) {
    const userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

document.addEventListener("keydown", function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  levelTitle.textContent = `Level ${level}`;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  const button = document.querySelector("#" + randomChosenColor);
  button.classList.add("pressed");
  const audio = new Audio(`./sounds/${randomChosenColor}.mp3`);
  audio.play();
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

function animatePress(name) {
  const button = document.querySelector("#" + name);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("winner");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 3500);
    }
  } else {
    console.log("loser");
    const wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    const body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "#011F3F";
    }, 2000);
    gameOver();
  };
};

function gameOver() {
  levelTitle.textContent = "Game Over";
  setTimeout(() => {
    levelTitle.textContent = "Press Space Key to Start";
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }, 3000);
};

console.log(gamePattern, userClickedPattern);
