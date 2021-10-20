"use strict";

// Global variables
var leftOption;
var rightOption;

let progressBar;
let progressBarTop;

document.addEventListener("DOMContentLoaded", () => {
    menuScreenInterface.show();
    // quizScreenInterface.show();
    // document.querySelector(".memory-game").style.display = "grid";
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
