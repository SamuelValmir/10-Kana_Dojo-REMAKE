"use strict";

let progressBar;
let progressBarTop;

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("no-js");
    menuScreenInterface.show();

    // localStorage.clear();

    // It verifies if the browser supports web storage and local storage
    if (typeof (Storage) !== "undefined") {
        let canStoreJsonTasks = localStorage.getItem("canStoreJsonTasks");

        // It's important to make just one instance of the "database"/local storage
        if (canStoreJsonTasks === null || canStoreJsonTasks === undefined) {
            let statsData = {
                hiragana: { basic: {}, voiced: {}, combo1: {}, combo2: {} },
                katakana: { basic: {}, voiced: {}, combo1: {}, combo2: {} }
            };

            let eyeSpyData = {
                hiragana: { bestMatches: 0, bestMoves: 0 },
                katakana: { bestMatches: 0, bestMoves: 0 },
                both: { bestMatches: 0, bestMoves: 0 },
            };

            let matchMakerData = {
                hiragana: { bestMatches: 0, bestMoves: 0 },
                katakana: { bestMatches: 0, bestMoves: 0 },
                both: { bestMatches: 0, bestMoves: 0 },
            };

            setTimeout(() => {
                for (let index = 0; index < Object.entries(kana.groups).length; index++) {
                    let group = Object.entries(kana.groups)[index];
                    let groupName = group[0];
                    for (let family of Object.values(group[1])) {

                        for (let kana of family) {
                            kana = wanakana.toHiragana(kana);
                            statsData.hiragana[groupName][kana] = { "right": 0, "wrong": 0, "accuracy": 0 };

                            kana = wanakana.toKatakana(kana);
                            statsData.katakana[groupName][kana] = { "right": 0, "wrong": 0, "accuracy": 0 };

                        }
                    }
                }

                // It parses object to JSON
                statsData = JSON.stringify(statsData);
                eyeSpyData = JSON.stringify(eyeSpyData);
                matchMakerData = JSON.stringify(matchMakerData);

                // It storages data
                localStorage.setItem("statsData", statsData);
                localStorage.setItem("eyeSpyData", eyeSpyData);
                localStorage.setItem("matchMakerData", matchMakerData);

                console.log("Local storage defined.")

            }, 200);

        } else {
            menuScreenInterface.calculateProgress();
        }

    } else {
        console.error("This browser do not supports Local Storage");
        document.write("This browser do not supports Local Storage");
    }
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

function showTutorial() {
    let noClickScreen = document.querySelector(".do-not-click-screen");
    let hintHighlight = document.querySelector(".hint");
    let modalHint = document.querySelector(".modal-hint .container");
    let hintTitleCounter = document.querySelector(".modal-hint .top .counter");

    let modalHintContent = document.querySelector(".modal-hint .content");
    let buttonsContainer = document.querySelector(".modal-hint .container .bottom");
    let exitButton = document.querySelector(".modal-hint .container .bottom .exit-button");
    let backButton = document.querySelector(".modal-hint .container .bottom .back-button");
    let nextButton = document.querySelector(".modal-hint .container .bottom .next-button");
    let finishButton = document.querySelector(".modal-hint .container .bottom .finish-button");

    let modalControllerObject = new ModalController(backButton, nextButton);

    noClickScreen.style.display = "block";
    hintHighlight.style.display = "block";
    modalHint.style.display = "flex";

    hintTitleCounter.innerHTML = "";
    modalHintContent.innerHTML = " Welcome! Here you'll be able to learn the Japanese Hiragana and Katakana with games, tests and more. Would you like to see the tutorial?";
    nextButton.style.display = "block";
    finishButton.style.display = "none";
    backButton.innerHTML = "No";
    nextButton.innerHTML = "Yes";

    let menuScreenNav = document.querySelector(".menu-screen-nav");
    let menuScreenNavLeftOption = document.querySelector(".menu-screen-nav .left-option");
    let menuScreenNavRightOption = document.querySelector(".menu-screen-nav .right-option");
    let studySectionReference = document.querySelector(".menu-screen .study-section-reference");
    let studySectionFlashcard = document.querySelector(".menu-screen .study-section-flash-card");
    let studySectionQuiz = document.querySelector(".menu-screen .study-section-quiz");
    let progressSection = document.querySelector(".menu-screen .progress-section");
    let eyeSpySection = document.querySelector(".menu-screen .play-screen .eye-spy");
    let matchMakerSection = document.querySelector(".menu-screen .play-screen .match-maker");

    let aboutButton = document.querySelector(".menu-screen .menu-button");

    let hintIndex = 0;
    let hintList = [
        { "text": "Here you can navigate between the learn screen and the play screen.", "hintHighlightedComponent": menuScreenNav, "modalPos": "center", "nav": "left" },
        { "text": "In the learn screen you will learn new kana and store you progress.", "hintHighlightedComponent": menuScreenNavLeftOption, "modalPos": "center", "nav": "left" },
        { "text": "In the reference section you will have a table with all kana.", "hintHighlightedComponent": studySectionReference, "modalPos": "center", "nav": "left" },
        { "text": "In the flash card section you can try to remember the kana.", "hintHighlightedComponent": studySectionFlashcard, "modalPos": "bottom", "nav": "left" },
        { "text": "In the quiz section you will take a quiz where you need to write the write answer according to the kana.", "hintHighlightedComponent": studySectionQuiz, "modalPos": "bottom", "nav": "left" },
        { "text": "Here you can check you progress that is defined as long as you complete the quizzes.", "hintHighlightedComponent": progressSection, "modalPos": "top", "nav": "left", "moveTo": "left" },

        { "text": "In the play screen you will put in practice you knowledge by playing games.", "hintHighlightedComponent": menuScreenNavRightOption, "modalPos": "center", "nav": "left", "moveTo": "right" },
        { "text": "In Eye Spy you must to select the same kana that is sorted.", "hintHighlightedComponent": eyeSpySection, "modalPos": "bottom", "nav": "right"},
        { "text": "In the Match Maker you will play the memory game but with kana.", "hintHighlightedComponent": matchMakerSection, "modalPos": "bottom", "nav": "right", "moveTo": "right" },

        { "text": "Here you can replay the tutorial and see some contacts information. If you find some issues or perhaps if you would like to suggest new features, you can contact the developer (me) ;)", "hintHighlightedComponent": aboutButton, "modalPos": "center", "nav": "left" },
        { "text": "I hope you enjoy this application. ありがとうございます!", "hintHighlightedComponent": null, "modalPos": "center", "moveTo": "left", "nav": "left" },
    ]

    function tryToMove(index) {
        switch (hintList[index].moveTo) {
            case "left":
                menuScreenInterface.containersElement.scrollTo(0, 0);
                break;

            case "right":
                menuScreenInterface.containersElement.scrollTo((menuScreenInterface.containersElement.scrollWidth / 2), 0);
                break;
            default: break;
        }
    }

    function hintHighlightAnimation(hintHighlightedComponent, index = "0") {
        let displayWidth;
        switch (hintList[index].nav) {
            case "left":
                displayWidth = 0;
                break;

            case "right":
                displayWidth = document.documentElement.clientWidth;
                break;
        }

        if (hintHighlightedComponent !== null) {

            hintHighlight.animate([
                { width: 0 },
                { width: hintHighlightedComponent.offsetWidth + "px" }
            ],
                { duration: 200, easing: "ease-in", fill: "forwards" })

            hintHighlight.style.left = (hintHighlightedComponent.offsetLeft - displayWidth) + "px";
            hintHighlight.style.top = hintHighlightedComponent.offsetTop + "px";
            hintHighlight.style.height = hintHighlightedComponent.offsetHeight + "px";
        } else {
            hintHighlight.style.top = "-10rem";
        }
    }


    function showHint(index) {
        hintTitleCounter.innerHTML = (index + 1) + "/" + hintList.length;
        modalHintContent.innerHTML = hintList[index].text;
        let hintHighlightedComponent = hintList[index].hintHighlightedComponent;

        hintHighlightAnimation(hintHighlightedComponent, index);

        switch (hintList[index].modalPos) {
            case "top": {
                modalHint.animate([
                    { top: 0, bottom: "100vh", transform: "translateY(60%)" }
                ], { duration: 400, easing: "ease-out", fill: "forwards" })

            } break;
            case "center": {
                modalHint.animate([
                    { top: 0, bottom: 0, transform: "translateY(0)" }
                ], { duration: 400, easing: "ease-out", fill: "forwards" })

            } break;
            case "bottom": {
                modalHint.animate([
                    { top: "100vh", bottom: 0, transform: "translateY(-60%)" }
                ], { duration: 400, easing: "ease-out", fill: "forwards" })

            } break;
        }
    }

    function hintContainerComponentsControl() {
        switch (hintIndex) {
            case 0: {
                backButton.style.display = "none";
            } break;

            case 1: {
                backButton.style.display = "block";
            } break;

            case hintList.length - 2: {
                exitButton.style.display = "block";
                nextButton.style.display = "block";
                finishButton.style.display = "none";
            } break;

            case hintList.length - 1: {
                exitButton.style.display = "none";
                nextButton.style.display = "none";
                finishButton.style.display = "block";
            } break;
        }
    }

    async function backButtonListener() {
        if (nextButton.getAttribute("disabled") === "false") {

            nextButton.setAttribute("disabled", true);
            await modalControllerObject.animateLeftButton();
            nextButton.setAttribute("disabled", false);

            hintIndex--;
            hintContainerComponentsControl();

            tryToMove(hintIndex);
            showHint(hintIndex);
        }
    }

    async function nextButtonListener() {
        if (nextButton.getAttribute("disabled") === "false") {

            nextButton.setAttribute("disabled", true);
            await modalControllerObject.animateRightButton();
            nextButton.setAttribute("disabled", false);

            hintIndex++;
            hintContainerComponentsControl();

            tryToMove(hintIndex);
            showHint(hintIndex);
        }
    }

    async function tryExitButtonListener(event) {
        await modalControllerObject.animateButton(event.target);
        modalHintContent.innerHTML = "Are you sure that you want to skip the tutorial? You can always replay the tutorial in the about menu.";

        hintTitleCounter.innerHTML = "";
        hintHighlight.style.top = "-30rem";
        exitButton.style.display = "none";
        backButton.style.display = "block";
        backButton.innerHTML = "Exit";
        nextButton.innerHTML = "Continue";

        buttonsContainer.style.width = "50%"
        buttonsContainer.style.justifyContent = "space-between";
        buttonsContainer.style.gap = "0";

        modalHint.animate([
            { top: 0, bottom: 0, transform: "translateY(0)" }
        ], { duration: 400, easing: "ease-out", fill: "forwards" })

        hintHighlightAnimation(aboutButton);

        backButton.removeEventListener("click", backButtonListener);
        nextButton.removeEventListener("click", nextButtonListener);

        backButton.addEventListener("click", finishButtonListener);
        nextButton.addEventListener("click", startButtonListener);
    }

    async function finishButtonListener(event) {
        await modalControllerObject.animateButton(event.target);
        hintIndex = 0;
        noClickScreen.style.display = "none";
        hintHighlight.style.display = "none";
        modalHint.style.display = "none";

        exitButton.removeEventListener("click", finishButtonListener);
        backButton.removeEventListener("click", tryExitButtonListener);
        backButton.removeEventListener("click", finishButtonListener);
        nextButton.removeEventListener("click", startButtonListener);
        finishButton.removeEventListener("click", startButtonListener);

        localStorage.setItem("canStoreJsonTasks", false);
    }


    async function startButtonListener() {
        await modalControllerObject.animateRightButton();
        backButton.innerHTML = "&lt;" // <
        nextButton.innerHTML = "&gt;" // >

        backButton.removeEventListener("click", tryExitButtonListener);
        backButton.removeEventListener("click", finishButtonListener);
        nextButton.removeEventListener("click", startButtonListener);

        exitButton.addEventListener("click", tryExitButtonListener);
        finishButton.addEventListener("click", finishButtonListener);
        backButton.addEventListener("click", backButtonListener);
        nextButton.addEventListener("click", nextButtonListener);

        backButton.setAttribute("disabled", false);
        nextButton.setAttribute("disabled", false);

        exitButton.style.display = "block";
        backButton.style.display = "block";
        hintContainerComponentsControl();
        buttonsContainer.style.width = "50%"
        buttonsContainer.style.justifyContent = "space-between";
        buttonsContainer.style.gap = "0";

        showHint(hintIndex);
    }


    backButton.addEventListener("click", tryExitButtonListener);
    nextButton.addEventListener("click", startButtonListener);
}

let screensTransitions = {
    firstScreen: null,
    secondScreen: null,

    setScreens(firstScreen, secondScreen) {
        this.firstScreen = firstScreen.htmlElement;
        this.secondScreen = secondScreen.htmlElement;
    },

    transition_1(firstScreen, secondScreen) {
        const promise = new Promise(resolve => {

            this.setScreens(firstScreen, secondScreen);

            this.firstScreen.style.left = 0;
            this.firstScreen.style.zIndex = "0";
            const firstScreenAnimation = this.firstScreen.animate([
                { left: "-6rem" }
            ], { duration: 200 })

            firstScreenAnimation.addEventListener("finish", () => {
                firstScreen.hide();
            })

            this.secondScreen.style.left = document.documentElement.clientWidth + "px";
            this.secondScreen.style.zIndex = "2";

            const secondScreenAnimation = this.secondScreen.animate([
                { left: "0px" }
            ], { duration: 200 })

            secondScreenAnimation.addEventListener("finish", () => {
                this.secondScreen.style.left = "0";
                resolve();
            })
        })

        return promise;

    },

    transition_2(firstScreen, secondScreen) {
        this.setScreens(firstScreen, secondScreen);

        secondScreen.show();
        this.firstScreen.style.left = 0;
        this.firstScreen.style.zIndex = 1;

        const firstScreenAnimation = this.firstScreen.animate([
            { left: document.documentElement.clientWidth + "px" }
        ], { duration: 200 })

        firstScreenAnimation.addEventListener("finish", () => {
            this.firstScreen.style.left = document.documentElement.clientWidth + "px";
            firstScreen.hide();
        })

        this.secondScreen.style.left = "-6rem";
        this.secondScreen.style.zIndex = 0;

        const secondScreenAnimation = this.secondScreen.animate([
            { left: "0" }
        ], { duration: 200 })

        secondScreenAnimation.addEventListener("finish", () => {
            this.secondScreen.style.left = "0";
        })
    },

}

function returnButtonAnimation(returnButtonHighlight) {
    const promise = new Promise(resolve => {

        returnButtonHighlight.style.display = "block";

        let animation = returnButtonHighlight.animate([
            {
                display: "block",
                transform: "scale(2)"
            }
        ], { duration: 150, easing: "ease" })

        animation.addEventListener("finish", () => {
            returnButtonHighlight.style.display = "none";
            resolve();
        })
    })

    return promise;
}

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
