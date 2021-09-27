"use strict";

// Constants
const PRIMARY_COLOR = "rgb(213, 3, 3)";

// Global variables
var kanaJson;
var leftOption;
var rightOption;

let progressBar;
let progressBarTop;

document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/kana.json")
        .then(response => response.json())
        .then(data => {
            kanaJson = data;
        })
        .then(
            () => {
                document.querySelector(".reference-screen").style.display = "none";
                document.querySelector(".modal-main").style.display = "none";
                // document.querySelector(".flash-screen").style.display = "none";
                // document.querySelector(".quiz-screen").style.display = "none";

                document.body.style.backgroundColor = "white";

                changeScreen(null, ".menu-screen");
            }
        )

})

function changeScreen(exitScreen, goScreen) {
    // Nav options are the options of the nav in the header of the screen
    let navOptions;

    // It makes the atual screen fade away and the required screen shows up
    if (document.querySelector(exitScreen) != null) {
        document.querySelector(exitScreen).style.display = "none";
    }

    if (document.querySelector(goScreen) != null) {
        document.querySelector(goScreen).style.display = "block";
    }

    // Change the variables of the options of the nav according to which screen is on 
    switch (goScreen) {
        case ".menu-screen": {
            leftOption = document.querySelector(".learn-option");
            rightOption = document.querySelector(".play-option");
            navOptions = document.querySelector(".menu-screen-nav").children;
        } break;

        case ".reference-screen": {
            progressBar = document.querySelector(".reference-screen-progress-container");
            progressBarTop = progressBar.offsetTop;
            leftOption = document.querySelector(".hiragana-option");
            rightOption = document.querySelector(".katakana-option");
            navOptions = document.querySelector(".reference-screen-nav").children;
        } break;

        default: alert("Switch case in general screen had an error!");
            break;
    }

    // Initial values for always select the first option of the nav
    leftOption.dataset.selected = true;
    leftOption.style.borderBottom = "5px solid white";

    rightOption.dataset.selected = false;
    rightOption.style.borderBottom = "none"
    leftOption.classList.remove("highlight");
    rightOption.classList.remove("highlight");

    for (const option of navOptions) {
        option.addEventListener("click", changeNavOption);
    }
}

function changeNavOption(event) { //It animates the change of the option of the nav and change the showed content
    let option = event.target;
    if (option.dataset.selected == "false") {
        if (option.classList.contains("left-option")) {
            leftOption.classList.add("highlight");
            rightOption.classList.remove("highlight");

            leftOption.style.borderBottom = "5px solid white";
            rightOption.style.borderBottom = "none";
            leftOption.dataset.selected = true;
            rightOption.dataset.selected = false;

            if (option.classList.contains("learn-option")) {
                goToLearnMenu();
            } else if (option.classList.contains("hiragana-option")) {
                drawCardsOnReferenceScreen("hiragana");
            }

        } else if (option.classList.contains("right-option")) {
            rightOption.classList.add("highlight");
            leftOption.classList.remove("highlight");

            leftOption.style.borderBottom = "none";
            rightOption.style.borderBottom = "5px solid white";
            leftOption.dataset.selected = false;
            rightOption.dataset.selected = true;

            if (option.classList.contains("play-option")) {
                goToPlayMenu();
            } else if (option.classList.contains("katakana-option")) {
                drawCardsOnReferenceScreen("katakana");
            }
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}