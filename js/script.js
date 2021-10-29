const guessedLetters = document.querySelector(".guessed-letters"); // Unordered list of guessed letters
const guessButton = document.querySelector(".guess"); //Guess button 
const inputLetter = document.querySelector(".letter"); //Text input for letter
const wordInProgress = document.querySelector(".word-in-progress"); // Empty p for word in progress
const remainingGuesses = document.querySelector(".remaining"); 
const spanRemainingGuesses = document.querySelector("span"); 
const message = document.querySelector(".message"); //Guessed letter messages
const playAgainButton = document.querySelector(".play-again"); //Button to play again

const word = "magnolia"; //Starting word to test game

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
    const guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
});




