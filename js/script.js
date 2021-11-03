const guessedLettersList = document.querySelector(".guessed-letters"); // Unordered list of guessed letters
const guessButton = document.querySelector(".guess"); //Guess button 
const inputLetter = document.querySelector(".letter"); //Text input for letter
const wordInProgress = document.querySelector(".word-in-progress"); // Empty p for word in progress
const remainingGuesses = document.querySelector(".remaining"); 
const spanRemainingGuesses = document.querySelector("span"); 
const message = document.querySelector(".message"); //Guessed letter messages
const playAgainButton = document.querySelector(".play-again"); //Button to play again

const word = "magnolia"; //Starting word to test game
const guessedLetters = []; //Empty array for guessed letters 


//Placeholder loop - convert letters of word to dots 
const placeholder = function (word) {
    const placeholderLetters = []; //empty array for letters of word to go into
    for (const letter of word) {
        console.log(letter); //confirm loop is working
        placeholderLetters.push("●") //adds each letter to array as dot 
        wordInProgress.innerText = placeholderLetters.join(""); //joins array into a string
    }
};
placeholder(word);

//Guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //prevents page from reloading every time button is pressed
    message.innerText = ""; // empties message text
    const guess = inputLetter.value; //variable to grab value from input box
    //console.log(guess); 
    const goodGuess = validateInput(guess); //make's sure input is a single letter
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
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); //Splits string into array
    const revealWord = []; 
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase())
        } else {
            revealWord.push("●");
        }
    };
    wordInProgress.innerText = revealWord.join("");
    console.log(revealWord);
    checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};







