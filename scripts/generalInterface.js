"use strict";


// Global variables
var leftOption;
var rightOption;

let progressBar;
let progressBarTop;

// CONSTANTS



document.addEventListener("DOMContentLoaded", () => {
    menuScreenInterface.show();
    // document.querySelector(".quiz-screen").style.display = "none";
    // document.querySelector(".memory-game").style.display = "grid";
})

function changeScreen(exitScreen, goScreen) {
    //     // Nav options are the options of the nav in the header of the screen
    //     let navOptions;

    //     // Change the variables of the options of the nav according to which screen is on 
    //     switch (goScreen) {
    //         case ".menu-screen": {
    //             root.style.setProperty("--scrollbarThumbColor", "rgb(213, 3, 3)");
    //             root.style.setProperty("--scrollbarTrackColor", "rgb(253, 94, 94)");

    //             leftOption = document.querySelector(".learn-option");
    //             rightOption = document.querySelector(".play-option");
    //             navOptions = document.querySelector(".menu-screen-nav").children;
    //         } break;

    //         case ".reference-screen": {
    //             root.style.setProperty("--scrollbarThumbColor", "rgb(0, 83, 65)");
    //             root.style.setProperty("--scrollbarTrackColor", "rgb(0, 255, 157)");

    //             progressBar = document.querySelector(".reference-screen-progress-container");
    //             progressBarTop = progressBar.offsetTop;
    //             leftOption = document.querySelector(".hiragana-option");
    //             rightOption = document.querySelector(".katakana-option");
    //             navOptions = document.querySelector(".reference-screen-nav").children;
    //         } break;

    //         default: alert("Switch case in general screen had an error!");
    //             break;
    //     }

    //     // Initial values for always select the first option of the nav
    //     leftOption.dataset.selected = true;
    //     leftOption.style.borderBottom = "5px solid white";

    //     rightOption.dataset.selected = false;
    //     rightOption.style.borderBottom = "none"
    //     leftOption.classList.remove("highlight");
    //     rightOption.classList.remove("highlight");

    //     for (const option of navOptions) {
    //         option.addEventListener("click", changeNavOption);
    //     }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
