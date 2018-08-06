var wordsList = ["cowboy", "cowboys", "cowgirl", "store", "cowboy", "ingredients"];
var wordsListIndex = 0;
var exampleWord = ""
var revealedWord = [];
var wins = 0;
var numberOfSolvedLetters = 0;
var lives = 6;
var pix = ["assets/images/0.png", "assets/images/1.png", "assets/images/2.png", "assets/images/3.png", "assets/images/4.png", "assets/images/5.png", "assets/images/6.png"]

function resetGame(index) {
    exampleWord = wordsList[index];
    revealedWord = [];
    for (var i = 0; i < exampleWord.length; i++) {
        revealedWord[i] = "_ "
    }

    numberOfSolvedLetters = 0;
    lives = 6;

    document.getElementById("guessed").textContent = "";

    revealedPrint();
    // document.getElementById("lives").textContent = "You have " + lives + " guesses remaining";

    document.getElementById("winCounter").textContent = "Win Count: " + wins;
    document.getElementById("picture").setAttribute("src", pix[lives]);
}

function revealedPrint() {
    var revealedText = ""

    for (var i = 0; i < exampleWord.length; i++) {
        revealedText += revealedWord[i];
        // $("#revealed").append(revealedWord[i]);
    }
    // $("#revealed").text(revealedText);
    document.getElementById("revealed").textContent = revealedText;
}

resetGame(0);

document.onkeyup = function (event) {

    var userGuess = event.key;

    if (numberOfSolvedLetters < exampleWord.length && lives > 0) {

        function check(guess, index, firstCheck) {
            var guessIndex = exampleWord.indexOf(guess, index);

            if (document.getElementById("guessed").textContent.indexOf(guess) !== -1 && firstCheck) {
                document.getElementById("word").textContent = "you already guessed that";
            }
            else {
                if (guessIndex === -1) {

                    if (firstCheck) {
                        document.getElementById("word").textContent = "That letter is not in the word.";
                        var textnode = document.createTextNode(userGuess + " ");
                        document.getElementById("guessed").appendChild(textnode);
                        lives--;
                    }
                }
                else {
                    document.getElementById("word").textContent = "Good guess.";
                    revealedWord[guessIndex] = userGuess + " ";
                    numberOfSolvedLetters++;
                    if (firstCheck) {
                        var textnode = document.createTextNode(userGuess + " ");
                        document.getElementById("guessed").appendChild(textnode);;
                    }
                    check(guess, guessIndex + 1, false);
                }
            }
        }

        check(userGuess, 0, true);

        revealedPrint();
        // document.getElementById("lives").textContent = "You have " + lives + " guesses remaining";
        document.getElementById("picture").setAttribute("src", pix[lives]);

        if (numberOfSolvedLetters === exampleWord.length) {
            document.getElementById("word").textContent = "YOU WIN! Press Enter to start a new game";
            wins++;
        }
        else if (lives === 0) {
            document.getElementById("word").textContent = "YOU LOSE! Press Enter to start a new game";
        }
    }
    else if (userGuess === "Enter") {

        resetGame(++wordsListIndex);
    }
}