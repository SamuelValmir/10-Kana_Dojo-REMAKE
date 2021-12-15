"use strict";

let progressBar;
let progressBarTop;

document.addEventListener("DOMContentLoaded", () => {
    menuScreenInterface.show();
    //! I MUST MAKE THE HINTS WHEN APPLICATION IS SHOWING FOR THE FIRST TIME

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
                hiragana: { best: 0, moves: 0 },
                katakana: { best: 0, moves: 0 },
                both: { best: 0, moves: 0 },
            };

            let matchMakerData = {
                hiragana: { best: 0, moves: 0 },
                katakana: { best: 0, moves: 0 },
                both: { best: 0, moves: 0 },
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
                
                localStorage.setItem("canStoreJsonTasks", false);

                console.log("Local storage defined.")

            }, 200);

        } else {
            menuScreenInterface.calculateProgress();
        }

    } else {
        console.error("This browser do not supports Local Storage");
        document.write("This browser do not supports Local Storage");
    }

    // setTimeout(()=>{

    //     let statsDataStored = JSON.parse(localStorage.getItem("statsData"));
    //     console.log(statsDataStored)
    // }, 210)
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
