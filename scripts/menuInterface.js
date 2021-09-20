"use strict";

// Global variables
let kanaJson;

let screens = [".menu-screen", ".reference-screen"];
let leftOption;
let rightOption;

document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/kana.json")
        .then(response => response.json())
        .then(data => {
            kanaJson = data;
        })
        .then(
            () => {
                drawCardsOnReferenceScreen();
                document.querySelector(".menu-screen").style.display = "none";
                // document.querySelector(".reference-screen").style.display = "none";

                document.body.style.backgroundColor = "white";

                // changeScreen(null, ".menu-screen");
            }
        )

})

async function drawCardsOnReferenceScreen() {
    let referenceScreenContainer = document.querySelector(".reference-screen .container");
    for (const group of Object.entries(kanaJson)) {
        let familyName = document.createElement("div");
        familyName.id = group[0];
        familyName.classList.add("family-name");
        group[0][0].toUpperCase;
        familyName.innerHTML = capitalizeFirstLetter(group[0]);
        referenceScreenContainer.appendChild(familyName);

        console.log(group)
        for (const family of Object.values(group[1])) {
            let familyElement = document.createElement("div");
            familyElement.classList.add("family");
            for (let kana of family) {
                let cardElement = document.createElement("div");
                cardElement.classList.add("card");

                let cardTop = document.createElement("span");
                cardTop.classList.add("top");
                cardTop.innerHTML = wanakana.toHiragana(kana);

                let cardBottom = document.createElement("span");
                cardBottom.classList.add("bottom");
                if (kana === "du"){
                    kana = "dzu";
                }
                cardBottom.innerHTML = kana;

                referenceScreenContainer.appendChild(familyElement);
                familyElement.appendChild(cardElement);
                cardElement.appendChild(cardTop);
                cardElement.appendChild(cardBottom);
            }
            if (familyElement.childElementCount == 2 || familyElement.childElementCount == 3) {
                familyElement.style.justifyContent = "space-between";
            }
        }
    }


    /* <div id="basic" class="family-name">Basic</div>
        <div class="family">
            <div class="card">
                <span class="top">a</span>
                <span class="bottom">b</span>
            </div> */
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let progressBar = document.querySelector(".reference-screen-progress-container");
let progressBarTop = progressBar.offsetTop;

// It fills the 3 scrolls bar as long as the screen is scrolled
window.onscroll = () => {
    let winScroll = document.documentElement.scrollTop;
    let voicedTop = document.querySelector("#voiced").offsetTop;
    let comboTop1 = document.querySelector("#combo1").offsetTop;
    let comboTop2 = document.querySelector("#combo2").offsetTop;
    let winHeight = document.documentElement.scrollHeight;

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

    document.querySelector("#basic-scroll").style.width = basicScrolled + "%";
    document.querySelector("#voiced-scroll").style.width = voicedScrolled + "%";
    document.querySelector("#combo-scroll1").style.width = comboScrolled1 + "%";
    document.querySelector("#combo-scroll2").style.width = comboScrolled2 + "%";
    pinOnTop();
}

function pinOnTop() {
    // console.log("wpos = " + window.pageYOffset);
    // console.log("pbt = " + progressBarTop);
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