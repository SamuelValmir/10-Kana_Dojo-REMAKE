"use strict";

let screens = [".menu-screen", ".reference-screen"];
let leftOption;
let rightOption;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".menu-screen").style.display = "none";
    // document.querySelector(".reference-screen").style.display = "none";

    document.body.style.backgroundColor = "white";

    // changeScreen(null, ".menu-screen");
})

let progressBar = document.querySelector(".reference-screen-progress-container");
let progressBarTop = progressBar.offsetTop;

// It fills the 3 scrolls bar as long as the screen is scrolled
window.onscroll = () => {
    let winScroll = document.documentElement.scrollTop;
    let voicedTop = document.querySelector("#voiced").offsetTop;
    let comboTop = document.querySelector("#combo").offsetTop;
    let winHeight = document.documentElement.scrollHeight;

    let basicBarHeight = voicedTop - document.documentElement.clientHeight;
    let voicedBarHeight = comboTop - voicedTop;
    let comboBarHeight = winHeight - comboTop;

    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let basicScrolled = (winScroll / basicBarHeight) * 100;
    let voicedScrolled = ((winScroll - basicBarHeight) / voicedBarHeight) * 100;
    let comboScrolled = ((winScroll - voicedBarHeight - basicBarHeight) / comboBarHeight) * 100;
    console.log(comboScrolled)


    // This if to not overflow the value between 0 and 100
    if (basicScrolled < 0) {
        basicScrolled = 0;
    }
    if (voicedScrolled < 0) {
        voicedScrolled = 0;
    }
    if (comboScrolled < 0) {
        comboScrolled = 0;
    }

    if (basicScrolled > 100) {
        basicScrolled = 100;
    }
    if (voicedScrolled > 100) {
        voicedScrolled = 100;
    }
    if (comboScrolled > 100) {
        comboScrolled = 100;
    }



    document.querySelector("#basic-scroll").style.width = basicScrolled + "%";
    document.querySelector("#voiced-scroll").style.width = voicedScrolled + "%";
    document.querySelector("#combo-scroll").style.width = comboScrolled + "%";
    pinOnTop();
}

function pinOnTop() {
    if (window.pageYOffset >= progressBarTop) {
        progressBar.classList.add("pinOnTop");
        let progressContainerHeight = document.querySelector(".reference-screen-progress-container").offsetHeight;
        document.body.style.marginTop = progressContainerHeight + "px";
    } else {
        progressBar.classList.remove("pinOnTop");
        document.body.style.marginTop = "0";
    }
}

function changeScreen(exitScreen, goScreen) {
    if (document.querySelector(exitScreen) != null) {
        document.querySelector(exitScreen).style.display = "none";

    }

    if (document.querySelector(goScreen) != null) {
        document.querySelector(goScreen).style.display = "block";
    }

    let navOptions;
    if (document.querySelector(".menu-screen").style.display !== "none") {
        leftOption = document.querySelector(".learn-option");
        rightOption = document.querySelector(".play-option");
        navOptions = document.querySelector(".menu-screen-nav").children;

    } else if (document.querySelector(".reference-screen").style.display !== "none") {
        leftOption = document.querySelector(".hiragana-option");
        rightOption = document.querySelector(".katakana-option");
        navOptions = document.querySelector(".reference-screen-nav").children;
    }

    leftOption.style.borderBottom = "5px solid white";
    for (const option of navOptions) {
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
            leftOption.style.borderBottom = "5px solid white";
            rightOption.style.borderBottom = "none";
            leftOption.dataset.selected = true;
            rightOption.dataset.selected = false;
            goToLearnMenu();

        } else if (option.classList.contains("right-option")) {
            rightOption.classList.add("highlight");
            leftOption.classList.remove("highlight");
            leftOption.style.borderBottom = "none";
            rightOption.style.borderBottom = "5px solid white";
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