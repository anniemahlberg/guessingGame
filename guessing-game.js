// ELEMENT VARIABLES
let playerInput = undefined;
const guessButton = document.getElementById("submitButton");
const guessDiv = document.getElementsByClassName("prevGuess")
const inputField = document.getElementsByTagName("input")[0]
const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")
const newGameButton = document.getElementById("newGame")
const hintDiv = document.getElementsByClassName("hint")
const hintButton = document.getElementById("getHint")


// GENERATE A WINNING NUMBER
let winningNumber = 0;

function generateWinningNumber() {
    winningNumber = Math.floor(Math.random() * 101);
    console.log(winningNumber)
}
generateWinningNumber();

// GET PLAYER INPUT
function getPlayerInput() {
    playerInput = document.getElementsByTagName("input")[0].value
}

// PRESS ENTER TO SUBMIT
function pressEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guessButton.click();
        inputField.value = ""
    }
}

inputField.addEventListener('keypress', pressEnter)

// MAKE A GUESS
function placeInput() {
    for (i = 0; i < 5; i++) {
        getPlayerInput()
        if (playerInput === "") {
            title.innerText = "Invalid guess, try again."
        } else if (isNaN(playerInput)) {
            title.innerText = "Invalid guess, try again."
        } else if (playerInput > 100 || playerInput < 0) {
            title.innerText = "Invalid guess, try again."
        } else if (guessDiv[i].innerText === "-") {
            guessDiv[i].innerText = playerInput;
            comparison();
            break;
        } else {
            continue;
        }
    }
    
    inputField.value = ""
}

guessButton.addEventListener('click', placeInput)

// COMPARE INPUT WITH WINNING NUMBER

function comparison() {
    playerInput = Number(playerInput);
    let difference = Math.abs(playerInput - winningNumber)
    if (playerInput === winningNumber) {
        title.innerText = "YAY!! YOU WIN!!"
        subtitle.innerText = "Click new game to play again!"
    } else if (guessDiv[4].innerText !== "-") {
        title.innerText = "Sorry, you lost. Try Again?";
        subtitle.innerText = "The winning number was " + winningNumber;
    } else if (difference <= 5) {
        subtitle.innerText = "You are on fire, but not there yet!"
    } else if (difference <= 10) {
        subtitle.innerText = "You are getting hotter..."
    } else if (difference <= 20) {
        subtitle.innerText = "You are getting warmer..."
    } else if (difference <= 30) {
        subtitle.innerText = "You are warmish..."
    } else if (difference <= 40) {
        subtitle.innerText = "You are cold..."
    } else if (difference <= 50) {
        subtitle.innerText = "You are colder..."
    } else if (difference <= 60) {
        subtitle.innerText = "You are shivering..."
    } else if (difference <= 70) {
        subtitle.innerText = "You are FREEZING..."
    }
    
    if (playerInput !== winningNumber && guessDiv[4].innerText !== "-") {
        title.innerText = "Sorry, you lost. Try Again?";
        subtitle.innerText = "The winning number was " + winningNumber;
    } else if (playerInput < winningNumber) {
        title.innerText = "Go higher"
    } else if (playerInput > winningNumber) {
        title.innerText = "Go lower"
    }
}

// NEW GAME
function startNewGame() {
    for (i = 0; i < 5; i++) {
        guessDiv[i].innerText = "-"
    }

    for (j = 0; j < 10; j++) {
        hintDiv[j].innerText = "";
    }

    title.innerText = "Guessing Game"
    subtitle.innerText = "Guess a number between 1 and 100"
    generateWinningNumber();
    hintButton.disabled = false;
}

newGameButton.addEventListener('click', startNewGame)

// HINTS
function getHints() {
    function randomNumber() {
        return Math.floor(Math.random() * 101)
    }

    function randomDiv() {
        return Math.floor(Math.random() * 10)
    }

    hintDiv[randomDiv()].innerHTML = winningNumber;

    for (i = 0; i < 10; i++) {
        if (hintDiv[i].innerText === "") {
            hintDiv[i].innerText = randomNumber();
        }
    }

    hintButton.disabled = true;
}

hintButton.addEventListener('click', getHints)

