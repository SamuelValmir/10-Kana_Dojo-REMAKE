"use strict";

let progressBar;
let progressBarTop;

document.addEventListener("DOMContentLoaded", () => {
    menuScreenInterface.show();
    // eyeSpyScreenInterface.showStartScreen();
    // statsScreenInterface.show();
    //! I MUST MAKE THE HINTS WHEN APPLICATION IS SHOWING FOR THE FIRST TIME
    // document.querySelector(".memory-game").style.display = "grid";
})

// It fills the 3 scrolls bar as long as the screen is scrolled
window.document.addEventListener("scroll", () => {
    let winScroll = document.documentElement.scrollTop;
    let winHeight = document.documentElement.scrollHeight;
    let voicedTop;
    let comboTop1;
    let comboTop2;

    let basicScroll;
    let voicedScroll;
    let combo1Scroll;
    let combo2Scroll;

    let screenShowing;
    if (referenceScreenInterface.isShowing === true) {
        screenShowing = "reference";
        voicedTop = document.querySelector(".reference-screen .voiced").offsetTop;
        comboTop1 = document.querySelector(".reference-screen .combo1").offsetTop;
        comboTop2 = document.querySelector(".reference-screen .combo2").offsetTop;

        basicScroll = document.querySelector(".reference-screen .basic-scroll");
        voicedScroll = document.querySelector(".reference-screen .voiced-scroll");
        combo1Scroll = document.querySelector(".reference-screen .combo-scroll1");
        combo2Scroll = document.querySelector(".reference-screen .combo-scroll2");

    } else if (statsScreenInterface.isShowing === true) {
        screenShowing = "stats";
        voicedTop = document.querySelector(".stats-screen .voiced").offsetTop;
        comboTop1 = document.querySelector(".stats-screen .combo1").offsetTop;
        comboTop2 = document.querySelector(".stats-screen .combo2").offsetTop;
;
        basicScroll = document.querySelector(".stats-screen .basic-scroll");
        voicedScroll = document.querySelector(".stats-screen .voiced-scroll");
        combo1Scroll = document.querySelector(".stats-screen .combo-scroll1");
        combo2Scroll = document.querySelector(".stats-screen .combo-scroll2");
    }

    if (referenceScreenInterface.isShowing === true || statsScreenInterface.isShowing === true) {

        let basicBarHeight = voicedTop - document.documentElement.clientHeight;
        let voicedBarHeight = comboTop1 - voicedTop;
        let comboBarHeight1 = comboTop2 - comboTop1;
        let comboBarHeight2 = winHeight - comboTop2;

        let basicScrolled = (winScroll / basicBarHeight) * 100;
        let voicedScrolled = ((winScroll - basicBarHeight) / voicedBarHeight) * 100;
        let comboScrolled1 = ((winScroll - voicedBarHeight - basicBarHeight) / comboBarHeight1) * 100;
        let comboScrolled2 = ((winScroll - comboBarHeight1 - voicedBarHeight - basicBarHeight) / comboBarHeight2) * 100;

        // This is to not overflow the value between 0 and 100
        if (basicScrolled < 0) {
            basicScrolled = 0;
        } else if (basicScrolled > 100) {
            basicScrolled = 100;
        }

        if (voicedScrolled < 0) {
            voicedScrolled = 0;
        } else if (voicedScrolled > 100) {
            voicedScrolled = 100;
        }

        if (comboScrolled1 < 0) {
            comboScrolled1 = 0;
        } else if (comboScrolled1 > 100) {
            comboScrolled1 = 100;
        }

        if (comboScrolled2 < 0) {
            comboScrolled2 = 0;
        } else if (comboScrolled2 > 100) {
            comboScrolled2 = 100;
        }

        basicScroll.style.width = basicScrolled + "%";
        voicedScroll.style.width = voicedScrolled + "%";
        combo1Scroll.style.width = comboScrolled1 + "%";
        combo2Scroll.style.width = comboScrolled2 + "%";
        pinOnTop(screenShowing);
    }
})

function pinOnTop(screenShowing) {
    let screen;
    if (screenShowing === "reference") {
        screen = referenceScreenInterface;
    } else if (screenShowing === "stats") {
        screen = statsScreenInterface;
    }
    // If the top of the screen overflow the progress bars'top
    if (window.pageYOffset >= screen.progressBarTop) {
        screen.progressBar.classList.add("pinOnTop");
        let progressContainerHeight = document.querySelector(".reference-screen .progress-container").offsetHeight;
        document.body.style.marginTop = progressContainerHeight + "px";
    } else {
        screen.progressBar.classList.remove("pinOnTop");
        document.body.style.marginTop = "0";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
