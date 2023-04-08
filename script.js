console.log("le fichier script.js s'éxécute");

const buttonNewGame = document.getElementById("new_game");
const buttonNewGame2 = document.getElementById("new_game2");
const buttonRoll = document.getElementById("button_roll");
const buttonHold = document.getElementById("hold");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let dice_value = 0;
let globalValue = 0;
let roundValue = 0;

//remet tous les compteurs a 0 pour une nouvelle partie
function newGame() {
  let displayWinDiv = document.querySelector(".win");
  let wrapperBlur = document.querySelector(".wrapper");

  dice_value = 0;
  roundValue = 0;
  changeState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let elem of document.querySelectorAll(".global_value")) {
    elem.innerHTML = "0";
  }

  for (let elem of document.querySelectorAll(".round_value")) {
    elem.innerHTML = "0";
  }

  if (displayWinDiv.classList.contains("hide")) {
    return 0;
  } else {
    displayWinDiv.classList.add("hide");
  }

  if (wrapperBlur.classList.contains("blur")) {
    wrapperBlur.classList.remove("blur");
  }
}

// fonction qui simule un lancé de dé
function rollDice() {
  dice_value = Math.random() * 6;
  dice_value = Math.ceil(dice_value);
  return dice_value;
}

//affiche la valeur du dé
function displayDice() {
  ctx.fillStyle = "#ff4f4a";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (dice_value) {
    case 1:
      ctx.beginPath();
      ctx.arc(150, 75, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 2:
      ctx.beginPath();
      ctx.arc(75, 75, 20, 0, Math.PI * 2);
      ctx.arc(225, 75, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(150, 75, 20, 0, Math.PI * 2);
      ctx.arc(75, 75, 20, 0, Math.PI * 2);
      ctx.arc(225, 75, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 4:
      ctx.beginPath();
      ctx.arc(75, 40, 20, 0, Math.PI * 2);
      ctx.arc(225, 40, 20, 0, Math.PI * 2);
      ctx.moveTo(75, 115);
      ctx.arc(75, 115, 20, 0, Math.PI * 2);
      ctx.arc(225, 115, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 5:
      ctx.beginPath();
      ctx.arc(75, 40, 20, 0, Math.PI * 2);
      ctx.arc(225, 40, 20, 0, Math.PI * 2);
      ctx.moveTo(75, 115);
      ctx.arc(75, 115, 20, 0, Math.PI * 2);
      ctx.arc(225, 115, 20, 0, Math.PI * 2);
      ctx.moveTo(150, 75);
      ctx.arc(150, 75, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 6:
      ctx.beginPath();
      ctx.arc(75, 40, 20, 0, Math.PI * 2);
      ctx.arc(150, 40, 20, 0, Math.PI * 2);
      ctx.arc(225, 40, 20, 0, Math.PI * 2);
      ctx.moveTo(75, 115);
      ctx.arc(75, 115, 20, 0, Math.PI * 2);
      ctx.arc(150, 115, 20, 0, Math.PI * 2);
      ctx.arc(225, 115, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

//augmente la valeur de round
function increaseRoundValue() {
  let changeRoundValue = document.querySelector(
    ".actif .round_player .round_value"
  );
  if (dice_value == 1) {
    changeRoundValue.innerHTML = 0;
    roundValue = 0;
    changeState();
  } else {
    roundValue += dice_value;
    changeRoundValue.innerHTML = roundValue;
  }
}

//stock la valeur actuelle de round dans le score global du joueur
function increaseGlobalValue() {
  let changeGlobalValue = document.querySelector(".actif .global_value");
  let changeRoundValue = document.querySelector(
    ".actif .round_player .round_value"
  );

  globalValue = parseInt(changeGlobalValue.innerHTML);
  globalValue += roundValue;
  changeGlobalValue.innerHTML = globalValue;
  roundValue = 0;
  changeRoundValue.innerHTML = "0";
}

//affiche le joueur vainqueur et termine la partie
function finishGame() {
  let valueGlobal = document.querySelector(".actif .global_value");
  let displayWinDiv = document.querySelector(".win");
  let wrapperBlur = document.querySelector(".wrapper");
  let valuePlayer = document.querySelector(".actif .content h2");
  let textVictoire = document.querySelector(".victoire");

  console.log(valuePlayer.innerHTML);

  if (valueGlobal.innerHTML >= 100) {
    displayWinDiv.classList.remove("hide");
    wrapperBlur.classList.add("blur");
    textVictoire.innerHTML = "VICTOIRE DE " + valuePlayer.innerHTML;
  }
}

//change l'etat d'actif a inactif et inversement
function changeState() {
  // Récupère les éléments ayant les classes "player1_background" et "player2_background"
  let player1Background = document.querySelector(".player1_background");
  let player2Background = document.querySelector(".player2_background");
  roundValue = 0;

  // Vérifie si le premier élément a la classe "actif"
  if (player1Background.classList.contains("actif")) {
    // Interchange les classes des éléments
    player1Background.classList.remove("actif");
    player1Background.classList.add("inactif");
    player2Background.classList.remove("inactif");
    player2Background.classList.add("actif");
  } else {
    // Interchange les classes des éléments
    player2Background.classList.remove("actif");
    player2Background.classList.add("inactif");
    player1Background.classList.remove("inactif");
    player1Background.classList.add("actif");
  }
}

buttonRoll.addEventListener("click", rollDice);
buttonRoll.addEventListener("click", displayDice);
buttonRoll.addEventListener("click", increaseRoundValue);

buttonHold.addEventListener("click", increaseGlobalValue);
buttonHold.addEventListener("click", finishGame);
buttonHold.addEventListener("click", changeState);

buttonNewGame.addEventListener("click", newGame);
buttonNewGame2.addEventListener("click", newGame);
