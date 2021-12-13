"use strict";

let statsScreenInterface = {
    htmlElement: document.querySelector(".stats-screen"),
    isShowing: false,
    firstShow: true,
    returnButton: document.querySelector(".stats-screen .return-button"),
    returnButtonHighlight: document.querySelector(".stats-screen .return-button-highlight"),

    statsScreenModel: new StatsScreenModel(),
    progressBar: document.querySelector(".stats-screen .progress-container"),
    progressBarTop: "",
    setProgressBarTop() {
        this.progressBarTop = this.progressBar.offsetTop;
    },

    resetBasicScrollWidth() {
        const basicScroll = document.querySelector(".stats-screen .basic-scroll");
        basicScroll.style.width = 0;
    },

    navOptions: {
        hiraganaOption: document.querySelector(".stats-screen .hiragana-option"),
        katakanaOption: document.querySelector(".stats-screen .katakana-option"),
        hiraganaOptionHighlight: document.querySelector(".stats-screen .hiragana-option .option-highlight"),
        katakanaOptionHighlight: document.querySelector(".stats-screen .katakana-option .option-highlight")
    },

    screens: {
        hiraganaScreen: document.querySelector(".stats-screen .hiragana-screen"),
        katakanaScreen: document.querySelector(".stats-screen .katakana-screen"),
    },
    containers: document.querySelector(".stats-screen .containers"),
    scrollBar: document.querySelector(".stats-screen .nav .scroll-bar"),

    show(navOptionSelected) {
        this.htmlElement.style.display = "block";
        this.initialize(navOptionSelected);
        this.isShowing = true;
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;
    },

    drawCards(option, containerScreen) {
        let statsScreenContainer = containerScreen;
        let rowElement;
        rowElement = document.createElement("div");
        rowElement.classList.add("row");
        rowElement.classList.add("top");

        let kanaElement = document.createElement("span");
        kanaElement.innerHTML = "Kana";

        let rightElement = document.createElement("span");
        rightElement.innerHTML = "Right";

        let wrongElement = document.createElement("span");
        wrongElement.innerHTML = "Wrong";

        let accuracyElement = document.createElement("span");
        accuracyElement.innerHTML = "Accuracy";

        statsScreenContainer.appendChild(rowElement);
        rowElement.appendChild(kanaElement);
        rowElement.appendChild(rightElement);
        rowElement.appendChild(wrongElement);
        rowElement.appendChild(accuracyElement);

        let statsDataStored = JSON.parse(localStorage.getItem("statsDataStored"));
        let groupList = statsDataStored[option];

        for (let group in groupList) {
            let addGroupClass = true;
            for (kana in groupList[group]) {
                let kanaObject = groupList[group][kana];

                let rowElement;
                rowElement = document.createElement("div");
                rowElement.classList.add("row");

                if (addGroupClass === true) {
                    addGroupClass = false;
                    rowElement.classList.add(group);
                }

                let kanaElement = document.createElement("span");
                kanaElement.classList.add("kana");

                if (option === "hiragana") {
                    kanaElement.innerHTML = wanakana.toHiragana(kana);
                } else if (option === "katakana") {
                    kanaElement.innerHTML = wanakana.toKatakana(kana);
                }

                let rightElement = document.createElement("span");
                rightElement.classList.add("right");
                rightElement.innerHTML = kanaObject.right;

                let wrongElement = document.createElement("span");
                wrongElement.classList.add("wrong");
                wrongElement.innerHTML = kanaObject.wrong;

                let accuracyElement = document.createElement("span");
                accuracyElement.classList.add("accuracy");
                accuracyElement.innerHTML = kanaObject.accuracy + "%";

                statsScreenContainer.appendChild(rowElement);
                rowElement.appendChild(kanaElement);
                rowElement.appendChild(rightElement);
                rowElement.appendChild(wrongElement);
                rowElement.appendChild(accuracyElement);

                rowElement.addEventListener("click", (event) => {
                    let rowElement = event.target;
                    rowElement.animate([
                        { backgroundColor: "#aaa" }
                    ], { duration: 200, easing: "ease" })
                })

            }
        }

        // for (let index = 0; index < Object.entries(kana.groups).length; index++) {
        //     let group = Object.entries(kana.groups)[index];
        //     let addGroupClass = true;
        //     for (let family of Object.values(group[1])) {

        //         for (let kana of family) {
        //             let rowElement;
        //             rowElement = document.createElement("div");
        //             rowElement.classList.add("row");

        //             if (addGroupClass === true) {
        //                 addGroupClass = false;
        //                 rowElement.classList.add(group[0]);
        //             }

        //             let kanaElement = document.createElement("span");
        //             kanaElement.classList.add("kana");

        //             if (option === "hiragana") {
        //                 kanaElement.innerHTML = wanakana.toHiragana(kana);
        //             } else if (option === "katakana") {
        //                 kanaElement.innerHTML = wanakana.toKatakana(kana);
        //             }

        //             let rightElement = document.createElement("span");
        //             rightElement.classList.add("right");
        //             rightElement.innerHTML = "4";

        //             let wrongElement = document.createElement("span");
        //             wrongElement.classList.add("wrong");
        //             wrongElement.innerHTML = "5";

        //             let accuracyElement = document.createElement("span");
        //             accuracyElement.classList.add("accuracy");
        //             accuracyElement.innerHTML = "44%";

        //             statsScreenContainer.appendChild(rowElement);
        //             rowElement.appendChild(kanaElement);
        //             rowElement.appendChild(rightElement);
        //             rowElement.appendChild(wrongElement);
        //             rowElement.appendChild(accuracyElement);

        //             rowElement.addEventListener("click", (event) => {
        //                 let rowElement = event.target;
        //                 rowElement.animate([
        //                     { backgroundColor: "#aaa" }
        //                 ], { duration: 200, easing: "ease" })
        //             })
        //         }
        //     }
        // }
    },

    initialize(navOptionSelected) {
        let hiraganaOption = this.navOptions.hiraganaOption;
        let katakanaOption = this.navOptions.katakanaOption;
        let hiraganaOptionHighlight = this.navOptions.hiraganaOptionHighlight;
        let katakanaOptionHighlight = this.navOptions.katakanaOptionHighlight;

        let hiraganaScreen = this.screens.hiraganaScreen;
        let katakanaScreen = this.screens.katakanaScreen;

        const NavModelObject = new NavModel(navOptionSelected);
        const NavControllerObject = new NavController(hiraganaOption, hiraganaOptionHighlight, katakanaOption, katakanaOptionHighlight, navOptionSelected, hiraganaScreen, katakanaScreen, this.containers, this.scrollBar, undefined);

        const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, NavControllerObject)

        if (this.firstShow === true) {
            this.firstShow = false;

            statsScreenInterface.drawCards(HIRAGANA, hiraganaScreen);
            statsScreenInterface.drawCards(KATAKANA, katakanaScreen);

            hiraganaOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateLeftOption() === true) {
                    HeaderControllerObject.nav.animateLeftOption();
                }
            })

            katakanaOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateRightOption() === true) {
                    HeaderControllerObject.nav.animateRightOption();
                }
            })

            statsScreenInterface.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();

                const firstScreen = this;
                const secondScreen = menuScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                menuScreenInterface.show();
            })

            this.containers.addEventListener("scroll", () => { HeaderControllerObject.nav.scrollListener(NavModelObject) })
        }

        this.setProgressBarTop();
        this.resetBasicScrollWidth();
    },
}


function pinOnTop() {
    // If the top of the screen overflow the progress bars'top
    if (window.pageYOffset >= statsScreenInterface.progressBarTop) {
        statsScreenInterface.progressBar.classList.add("pinOnTop");
        let progressContainerHeight = document.querySelector(".stats-screen .progress-container").offsetHeight;
        document.body.style.marginTop = progressContainerHeight + "px";
    } else {
        statsScreenInterface.progressBar.classList.remove("pinOnTop");
        document.body.style.marginTop = "0";
    }
}