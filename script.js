'use strict';

// Player0 and Player1
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// Players current score and totalScore
const player0CurrentScoreObj = document.querySelector('#current--0');
const player0ScoreObj = document.querySelector('#score--0');
const player1CurrentScoreObj = document.querySelector('#current--1');
const player1ScoreObj = document.querySelector('#score--1');
// All the Buttons
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const diceImgObj = document.querySelector('.dice');

let activePlayer = player0;
let waitingPlayer = player1;
let player0CurrentScore = 0;
let player0Score = 0;
let player1CurrentScore = 0;
let player1Score = 0;

function player0CurrentScoreUpdate(d) {
  player0CurrentScore = d;
  player0CurrentScoreObj.textContent = player0CurrentScore;
}
function player0ScoreUpdate(d) {
  player0Score = d;
  player0ScoreObj.textContent = player0Score;
}
function player1CurrentScoreUpdate(d) {
  player1CurrentScore = d;
  player1CurrentScoreObj.textContent = player1CurrentScore;
}
function player1ScoreUpdate(d) {
  player1Score = d;
  player1ScoreObj.textContent = player1Score;
}

function switchPlayer() {
  if (activePlayer === player0) player0CurrentScoreUpdate(0);
  else player1CurrentScoreUpdate(0);

  //   swapping the activePlayer and waitingPlayer
  [activePlayer, waitingPlayer] = [waitingPlayer, activePlayer];

  activePlayer.classList.add('player--active');
  waitingPlayer.classList.remove('player--active');
}
function newGame() {
  if (activePlayer === player0) player0CurrentScoreUpdate(0);
  else player1CurrentScoreUpdate(0);
  player0ScoreUpdate(0);
  player1ScoreUpdate(0);

  activePlayer = player1;
  waitingPlayer = player0;
  switchPlayer();
  diceImgObj.classList.add('hidden');
}

function rollDice(e) {
  const randomNumber = parseInt(Math.random() * 6) + 1;
  if (diceImgObj.classList.contains('hidden'))
    diceImgObj.classList.remove('hidden');

  diceImgObj.src = `dice-${randomNumber}.png`;
  if (randomNumber === 1) {
    switchPlayer();
    return;
  }
  if (activePlayer === player0)
    player0CurrentScoreUpdate(player0CurrentScore + randomNumber);
  else player1CurrentScoreUpdate(player1CurrentScore + randomNumber);
}
function hold() {
  if (activePlayer === player0)
    player0ScoreUpdate(player0Score + player0CurrentScore);
  else player1ScoreUpdate(player1Score + player1CurrentScore);
  switchPlayer();
}

rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
