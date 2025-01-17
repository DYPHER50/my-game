
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1.textContent = 0;
    score2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    dice.classList.add("hidden");
    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
};
init();

const switchPlayer = function(){
    document.getElementById(
        `current--${activePlayer}`
    ).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
};

btnRoll.addEventListener('click', function(){
    if (playing){
        const diceEl = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove("hidden");
        dice.src = `dice-${diceEl}.png`;        
        if (diceEl !== 1){
            currentScore += diceEl;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if (playing){
        scores[activePlayer] += currentScore;
        document.getElementById(
            `score--${activePlayer}`
        ).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100){
            playing = false;
            dice.classList.add("hidden");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else{
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click',init);

