

var wordBank = ["hello", "world", "apple"];
var theWord = "apple";
var inquirer = require("inquirer");
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

var usedLetters = [];
var wordCover = [];
var numCount = 0;
var Chances = 5;

choose = function () {
    theWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    for (i = 0; i < theWord.length; i++) {
        wordCover.push("___");

    }
    console.log("\n" + wordCover.join(" ") + "\n");

}

choose();
var newG = function () {
    inquirer
        .prompt([

            {
                type: "list",
                message: "New Game??",
                choices: ["Yes", "No"],
                name: "newG"

            },

        ]).then(function (resp) {
            if (resp.newG === "Yes") {
                usedLetters = [];
                wordCover = [];
                numCount = 0;
                Chances = 5;
                console.log("NEW GAME");
                choose();
                chooseLetter();

            } else {
                console.log("Have A Good Day!");
            }


        })
        .catch(function (err) {
            console.log(err);
        });

}
var scan = function (e) {
    // console.log("scanning");
    // console.log("letter chososen : " + e);
    var found = false;
    for (i = 0; i < theWord.length; i++) {

        if (e === theWord[i]) {
            // console.log("letter found!");
            wordCover[i] = e;
            // console.log("\n"+ wordCover.join(" ") + "\n");
            numCount++;
            found = true;
        }

    }
    if (!found) {
        Chances--;
    }

    console.log("\n" + wordCover.join("  ") + "\n");
    console.log("\nChances : " + Chances);
    //  console.log("\nnum1: " + numCount + " num2: " +theWord.length );

    usedLetters.push(e);
    if (numCount >= theWord.length) {
        console.log("You Win!")
        newG(); 
    } else {
        if (Chances <= 0) {
            console.log("you lose!");
            newG();
        } else {
            chooseLetter();
        }
    }
}


var letterCheck = function (e) {

    var stopper = true;
    for (i = 0; i < usedLetters.length; i++) {
        if (e === usedLetters[i]) {
            console.log("you've already used " + e);
            chooseLetter();
            stopper = false;

        }
    }

    if (stopper) {

        scan(e);
    }
}


function chooseLetter() {
    inquirer
        .prompt([

            {
                type: "maxlength-input",
                message: "Choose a letter",
                name: "letter",
                maxLength: 1
            },

        ]).then(function (resp) {

            letterCheck(resp.letter);

        })
        .catch(function (err) {
            console.log(err);
        });

};
chooseLetter();



