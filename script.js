'use strict';

//selecting Element
const btnRolldice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const holdScore1El = document.querySelector('#score--0');
const holdScore2El = document.querySelector('#score--1');
const currentScore1El = document.querySelector('#current--0');
const currentScore2El = document.querySelector('#current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

//starting condition

holdScore1El.textContent = 0;
holdScore2El.textContent = 0;
let activePlayerNow = 0;
let holdScore = [0, 0];
let currentScore = [0, 0];
let playing = true;
diceEl.classList.add('hidden');

//Rolling Dice
const rollDice = function (activePlayer) {
  //create random number
  let dice = Math.trunc(Math.random() * 6 + 1);

  //display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore[activePlayer] += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore[activePlayer];
  } else {
    //swtich player;
    swtichPlayer(activePlayer);
  }
  console.log(dice);
};

//hold the score
const holdtheScore = function (activePlayer) {
  //hold score
  holdScore[activePlayer] += currentScore[activePlayer];
  document.querySelector(`#score--${activePlayer}`).textContent =
    holdScore[activePlayer];
  //check wining
  if (holdScore[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    diceEl.classList.add('hidden');
    playing = false;
  } else {
    swtichPlayer(activePlayer);
  }
};

//switch player
const swtichPlayer = function (activePlayer) {
  currentScore[activePlayer] = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayerNow = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

//set default
const init = function () {
  currentScore = [0, 0];
  holdScore = [0, 0];
  holdScore1El.textContent = 0;
  holdScore2El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore2El.textContent = 0;
  diceEl.classList.add('hidden');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  activePlayerNow = 0;
  playing = true;
};

btnRolldice.addEventListener('click', function () {
  if (playing) rollDice(activePlayerNow);
});

btnHold.addEventListener('click', function () {
  if (playing) holdtheScore(activePlayerNow);
});

btnNewGame.addEventListener('click', init);
init();
