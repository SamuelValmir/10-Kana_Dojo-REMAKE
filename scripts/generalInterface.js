"use strict";


// Global variables
var root = document.documentElement;

var kanaJson;

var basicKana;
var voicedKana;
var combo1Kana;
var combo2Kana;

var allBasicKana = [];
var allVoicedKana = [];
var allCombo1Kana = [];
var allCombo2Kana = [];

var leftOption;
var rightOption;

let progressBar;
let progressBarTop;

// CONSTANTS
const MENU_PRIMARY_COLOR = "rgb(213, 3, 3)";


document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/kana.json")
        .then(response => response.json())
        .then(data => {
            kanaJson = data;
            
            for (let i = 0; i < Object.entries(kanaJson).length; i++) {
                let kanaTypes = Object.entries(kanaJson);

                let kanaType = Object.values(kanaTypes[i][1]);

                for (let index = 0; index < kanaType.length; index++) {
                    const family = kanaType[index];
                    family.forEach((kana) => {

                        if (i === 0) {
                            basicKana = kanaTypes[i][1];
                            allBasicKana.push(kana);

                        } else if (i === 1) {
                            voicedKana = kanaTypes[i][1];
                            allVoicedKana.push(kana);

                        } else if (i === 2) {
                            combo1Kana = kanaTypes[i][1];
                            allCombo1Kana.push(kana);

                        } else if (i === 3) {
                            combo2Kana = kanaTypes[i][1];
                            allCombo2Kana.push(kana);
                        }
                    })
                }
            }
        })
        .then(
            () => {
                document.querySelector(".reference-screen").style.display = "none";
                document.querySelector(".modal-main").style.display = "none";
                document.querySelector(".modal-custom").style.display = "none";
                document.querySelector(".flashCard-screen").style.display = "block";
                // document.querySelector(".quiz-screen").style.display = "none";
                document.querySelector(".memory-game").style.display = "grid";

                document.body.style.backgroundColor = "white";

                // changeScreen(null, ".menu-screen");
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
            root.style.setProperty("--scrollbarThumbColor", "rgb(213, 3, 3)");
            root.style.setProperty("--scrollbarTrackColor", "rgb(253, 94, 94)");

            leftOption = document.querySelector(".learn-option");
            rightOption = document.querySelector(".play-option");
            navOptions = document.querySelector(".menu-screen-nav").children;
        } break;

        case ".reference-screen": {
            root.style.setProperty("--scrollbarThumbColor", "rgb(0, 83, 65)");
            root.style.setProperty("--scrollbarTrackColor", "rgb(0, 255, 157)");

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