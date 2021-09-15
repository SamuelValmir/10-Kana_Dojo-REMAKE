"use strict";
//* Those variables will have it's name changed after 

let leftOption;
let rightOption;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".menu-screen").style.display = "block";
    document.querySelector(".reference-screen").style.display = "none";
    document.body.style.backgroundColor = "white";

    changeScreen();
})

function changeScreen(){
    let options;
    if (document.querySelector(".menu-screen").style.display !== "none") {
        leftOption = document.querySelector(".learn-option");
        rightOption = document.querySelector(".play-option");
        options = document.querySelector(".menu-screen-nav").children;
        console.log(123)

    } else if (document.querySelector(".reference-screen").style.display !== "none") {
        leftOption = document.querySelector(".hiragana-option");
        rightOption = document.querySelector(".katakana-option");
        options = document.querySelector(".reference-screen-nav").children;
    }

    leftOption.style.borderBottom = "solid white";
    for (const option of options) {
        option.addEventListener("click", changeNavOption);
    }
}


function goToReferenceScreen() {
    document.querySelector(".menu-screen").style.display = "none";
    document.querySelector(".reference-screen").style.display = "block";
    changeScreen();
}

function changeNavOption(event) {
    let option = event.target;
    if (option.dataset.selected == "false") {
        if (option.classList.contains("left-option")) {
            leftOption.classList.add("highlight");
            rightOption.classList.remove("highlight");
            leftOption.style.borderBottom = "solid white";
            rightOption.style.borderBottom = "none";
            leftOption.dataset.selected = true;
            rightOption.dataset.selected = false;
            goToLearnMenu();

        } else if (option.classList.contains("right-option")) {
            rightOption.classList.add("highlight");
            leftOption.classList.remove("highlight");
            leftOption.style.borderBottom = "none";
            rightOption.style.borderBottom = "solid white";
            leftOption.dataset.selected = false;
            rightOption.dataset.selected = true;
            goToPlayMenu();
        }
    }
}

function goToPlayMenu() {
    console.log(123)
}

function goToLearnMenu() {
    console.log(443)
}