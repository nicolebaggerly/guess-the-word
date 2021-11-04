const guessedLettersList = document.querySelector(".guessed-letters"); // Unordered list of guessed letters
const guessButton = document.querySelector(".guess"); //Guess button 
const inputLetter = document.querySelector(".letter"); //Text input for letter
const wordInProgress = document.querySelector(".word-in-progress"); // Empty p for word in progress
const guessesRemaining = document.querySelector(".remaining"); 
const spanRemainingGuesses = document.querySelector("span"); 
const message = document.querySelector(".message"); //Guessed letter messages
const playAgainButton = document.querySelector(".play-again"); //Button to play again

//These variables need to be used with 'let' bc they change throughout the game
let word = "magnolia"; //Starting word to test game
let guessedLetters = []; //Empty array for guessed letters 
let remainingGuesses = 8; 

const getWord = async function () {
    const response = await fetch ('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const data = await response.text();
    const wordArray = data.split("\n"); //creates data into array, removes linebreak
    const randomIndex = Math.floor(Math.random() * wordArray.length); //selects random index in array
    word = wordArray[randomIndex].trim(); //converts index position to its word and trims whitespace
    placeholder(word);    
}

getWord(); //starts the game!


//Placeholder loop - convert letters of word to dots 
const placeholder = function (word) {
    const placeholderLetters = []; //empty array for letters of word to go into
    for (let letter of word) {
        console.log(letter); //confirm loop is working
        placeholderLetters.push("●") //adds each letter to array as dot 
        wordInProgress.innerText = placeholderLetters.join(""); //joins array into a string
    }
};


//Guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //prevents page from reloading every time button is pressed
    message.innerText = ""; // empties message text
    const guess = inputLetter.value; //captures value from input box
    //input is run through validateInput function
    const goodGuess = validateInput(guess); //make's sure input is a single letter
    //if input is single letter, runs makeGuess function
    if (goodGuess) {
        makeGuess(guess);
    }
    inputLetter.value = ""; //empties input box after guess 

});

//Validate player's input 
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Plese enter a single letter.";
        //use ! to show input is NOT a match 
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    };
};

//Checks if letter has already been guessed or adds to 'Guessed List' array
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again!"
    } else {
        guessedLetters.push(guess);
        //console.log(guessedLetters);
        showGuessedLetters();
        countGuesses(guess);
        updateWord(guessedLetters);
    }
};

//Shows guessed letters on screen
const showGuessedLetters = function () {
    guessedLettersList.innerHTML = ""; 
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

//Replaces dot with correct guessed letter 
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); //changes word to uppercase
    const wordArray = wordUpper.split(""); //splits string into array
    const revealWord = []; 
    //if guessed letter is in word, reveals letter on screen instead of dot
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase())
        } else {
            revealWord.push("●");
        }
    };
    wordInProgress.innerText = revealWord.join(""); //joins empty p with correctly guessed letters
    console.log(revealWord);
    checkIfWin();
};

//Updates remaining guesses count
const countGuesses = function(guess) {
    const wordUpper = word.toUpperCase(); 
    if (!wordUpper.includes(guess)) {
            message.innerText = `Sorry, this word does not contain ${guess}`;
            remainingGuesses -= 1; 
    } else {
            message.innerText = `Good guess! The word has the letter ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
        }
        else if (remainingGuesses === 1) {
            spanRemainingGuesses.innerText = `${remainingGuesses} guess`;
        } else {
            spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
        }
    };


//Checks if player won the game
const checkIfWin = function () {
    //if word matches letters in wordInProgress p, player wins
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};


const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//Resets the game
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses === 8;
    guessedLetters = [];
    spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});








