"use strict";
let menuScreenInterface = {
    htmlElement: document.querySelector(".menu-screen"),
    isShowing: false,
    firstShow: true,
    menuButton: document.querySelector(".menu-screen .menu-button"),
    headerObject: undefined,
    navModel: undefined,
    navOptions: {
        learnOption: document.querySelector(".menu-screen .learn-option"),
        playOption: document.querySelector(".menu-screen .play-option"),
        learnOptionHighlight: document.querySelector(".menu-screen .learn-option .option-highlight"),
        playOptionHighlight: document.querySelector(".menu-screen .play-option .option-highlight"),
    },

    screens: {
        learnScreen: document.querySelector(".menu-screen .learn-screen"),
        playScreen: document.querySelector(".menu-screen .play-screen"),
    },

    containersElement: document.querySelector(".menu-screen .containers"),
    scrollBar: document.querySelector(".menu-screen-nav .scroll-bar"),

    studySections: {
        htmlElement: document.querySelectorAll(".menu-screen .container .study-section"),
        referenceSection: document.querySelector(".menu-screen .study-section-reference"),
        flashCardSection: document.querySelector(".menu-screen .study-section-flash-card"),
        quizSection: document.querySelector(".menu-screen .study-section-quiz"),
    },

    games: {
        eyeSpyElement: document.querySelector(".menu-screen .play-screen .eye-spy"),
        matchMakerElement: document.querySelector(".menu-screen .play-screen .match-maker")
    },

    progress: {
        hiraganaProgress: document.querySelector(".menu-screen .progress-container-hiragana"),
        hiraganaProgressBar: document.querySelector(".menu-screen .progress-container-hiragana .progress-bar"),
        hiraganaProgressText: document.querySelector(".menu-screen .progress-container-hiragana .progress-text"),
        hiraganaProgressNumber: document.querySelector(".menu-screen .progress-container-hiragana .progress-number"),

        katakanaProgress: document.querySelector(".menu-screen .progress-container-katakana"),
        katakanaProgressBar: document.querySelector(".menu-screen .progress-container-katakana .progress-bar"),
        katakanaProgressText: document.querySelector(".menu-screen .progress-container-katakana .progress-text"),
        katakanaProgressNumber: document.querySelector(".menu-screen .progress-container-katakana .progress-number"),
    },

    show(optionSelected = "left") {
        this.htmlElement.style.display = "block";
        this.isShowing = true;
        this.initialize(optionSelected);
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;

        this.headerController.nav.closeMenuContent();
        this.navModel.menuContentIsShowing = false;
    },

    initialize(optionSelected) {
        let canStoreJsonTasks = localStorage.getItem("canStoreJsonTasks");
        if (canStoreJsonTasks === null || canStoreJsonTasks === undefined) {
            this.showTutorial();
        }

        // ----- Set the options of the learn option ----- 
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;
        let learnOptionHighlight = this.navOptions.learnOptionHighlight;
        let playOptionHighlight = this.navOptions.playOptionHighlight;

        let learnScreen = this.screens.learnScreen;
        let playScreen = this.screens.playScreen;

        const NavModelObject = new NavModel("left");
        const NavControllerObject = new NavController(learnOption, learnOptionHighlight, playOption, playOptionHighlight, optionSelected, learnScreen, playScreen, this.containersElement, this.scrollBar, this.menuButton);
        const HeaderControllerObject = new HeaderController(undefined, NavControllerObject);

        this.headerController = HeaderControllerObject;
        this.navModel = NavModelObject;


        // It places the .container right after the .header
        let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
        this.containersElement.style.setProperty("margin-top", menuHeaderHeight + "px");

        if (this.firstShow === true) {
            this.firstShow = false;

            window.onresize = () => {
                let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
                this.containersElement.style.setProperty("margin-top", menuHeaderHeight + "px")
            }

            this.menuButton.addEventListener("click", async () => {
                await HeaderControllerObject.nav.animateMenuButton();
                NavModelObject.menuContentIsShowing = true;
            })

            learnOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateLeftOption() === true) {
                    HeaderControllerObject.nav.animateLeftOption();
                }

            })

            playOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateRightOption() === true) {
                    HeaderControllerObject.nav.animateRightOption();
                }
            })

            this.games.eyeSpyElement.addEventListener("click", async () => {
                await this.animateSection(this.games.eyeSpyElement);

                const firstScreen = this;
                const secondScreen = gameStartScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                new EyeSpyScreenInterface().showStartScreen();
            })

            this.games.matchMakerElement.addEventListener("click", async () => {
                await this.animateSection(this.games.matchMakerElement);

                const firstScreen = this;
                const secondScreen = gameStartScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                new MatchMakerScreenInterface().showStartScreen();
            })

            window.addEventListener("click", async (event) => {
                let elementClicked = event.target;
                if (this.isShowing === true) {
                    if (NavModelObject.menuContentIsShowing === true) {

                        // If is clicked on about element
                        if (elementClicked.classList.contains("about") || elementClicked.classList.contains("about-text") || elementClicked.classList.contains("menu-button")) {
                            await HeaderControllerObject.nav.animateMenuContent();
                            HeaderControllerObject.nav.closeMenuContent();
                            this.hide();
                            aboutScreenInterface.show();
                        } else {
                            HeaderControllerObject.nav.closeMenuContent();
                        }

                        NavModelObject.menuContentIsShowing = false;
                    }
                }
            })

            // It makes the nav's scroll bar to move when container is scrolled
            this.containersElement.addEventListener("scroll", () => { HeaderControllerObject.nav.scrollListener(NavModelObject) })

            // ----- Set study sections -----
            let referenceSection = this.studySections.referenceSection;
            let flashCardSection = this.studySections.flashCardSection;
            let quizSection = this.studySections.quizSection;


            referenceSection.addEventListener("click", async () => {
                await this.animateSection(referenceSection);

                const firstScreen = this;
                const secondScreen = referenceScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                referenceScreenInterface.show();
            })

            flashCardSection.addEventListener("click", async () => {
                await this.animateSection(flashCardSection);
                modalMainInterface.show();
                modalMainInterface.leadsTo = FLASH_CARD_SCREEN;
            })

            quizSection.addEventListener("click", async () => {
                await this.animateSection(quizSection);
                modalMainInterface.show();
                modalMainInterface.leadsTo = QUIZ_SCREEN;
            })

            this.progress.hiraganaProgress.addEventListener("click", async () => {
                await this.animateSection(this.progress.hiraganaProgress);

                const firstScreen = this;
                const secondScreen = statsScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                statsScreenInterface.show("left");
            })

            this.progress.katakanaProgress.addEventListener("click", async () => {
                await this.animateSection(this.progress.katakanaProgress);

                const firstScreen = this;
                const secondScreen = statsScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);

                statsScreenInterface.show("right");
            })
        }
    },

    showTutorial() {
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

        let menuScreenNav = document.querySelector(".menu-screen-nav");
        let menuScreenNavLeftOption = document.querySelector(".menu-screen-nav .left-option");
        let menuScreenNavRightOption = document.querySelector(".menu-screen-nav .right-option");
        let studySectionReference = document.querySelector(".menu-screen .study-section-reference");
        let studySectionFlashcard = document.querySelector(".menu-screen .study-section-flash-card");
        let studySectionQuiz = document.querySelector(".menu-screen .study-section-quiz");
        let progressSection = document.querySelector(".menu-screen .progress-section");
        let eyeSpySection = document.querySelector(".menu-screen .play-screen .eye-spy");
        let matchMakerSection = document.querySelector(".menu-screen .progress-section");

        let hintIndex = 0;
        let hintList = [
            // { "text": "Here you can navigate between the learn screen and the play screen.", "hintHighlightedComponent": menuScreenNav, "modalPos": "center", "nav": "left"},
            // { "text": "In the learn screen you will learn new kana and store you progress.", "hintHighlightedComponent": menuScreenNavLeftOption, "modalPos": "center", "nav": "left" },
            // { "text": "In the reference section you will have a table with all kana.", "hintHighlightedComponent": studySectionReference, "modalPos": "center", "nav": "left" },
            // { "text": "In the flash card section you can try remember the kana.", "hintHighlightedComponent": studySectionFlashcard, "modalPos": "bottom", "nav": "left" },
            // { "text": "In the quiz section you will take a quiz where you need to write the write answer according to the kana.", "hintHighlightedComponent": studySectionQuiz, "modalPos": "bottom", "nav": "left" },
            { "text": "Here you can check you progress that is defined as long as complete the quizzes.", "hintHighlightedComponent": progressSection, "modalPos": "top", "nav": "left", "moveTo": "left"},

            { "text": "In the play screen you will put in practice you knowledge by playing games.", "hintHighlightedComponent": menuScreenNavRightOption, "modalPos": "center", "nav": "left", "moveTo": "right" },
            { "text": "In Eye Spy you must to select the same kana that is sorted.", "hintHighlightedComponent": eyeSpySection, "modalPos": "bottom", "nav": "right" },
            { "text": "In the Match Maker you will play the memory game but with kana;", "hintHighlightedComponent": this.games.matchMakerElement, "modalPos": "bottom", "nav": "right" },
            { "text": "", "hintHighlightedComponent": "", "modalPos": "", "moveTo": "", "nav": "left" },

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

        function showHint(index) {
            hintTitleCounter.innerHTML = (index + 1) + "/" + hintList.length;
            modalHintContent.innerHTML = hintList[index].text;
            let hintHighlightedComponent = hintList[index].hintHighlightedComponent;


            let displayWidth;
            switch (hintList[index].nav) {
                case "left":
                    displayWidth = 0;
                    break;

                case "right":
                    displayWidth = document.documentElement.clientWidth;
                    break;
            }
            hintHighlight.style.left = (hintHighlightedComponent.offsetLeft - displayWidth) + "px";
            hintHighlight.style.top = hintHighlightedComponent.offsetTop + "px";
            hintHighlight.style.width = hintHighlightedComponent.offsetWidth + "px";
            hintHighlight.style.height = hintHighlightedComponent.offsetHeight + "px";

            switch (hintList[index].modalPos) {
                case "top": {
                    modalHint.style.top = "0";
                    modalHint.style.bottom = "100vh";
                    modalHint.style.transform = "translateY(60%)";
                } break;
                case "center": {
                    modalHint.style.top = "0";
                    modalHint.style.bottom = "0";
                    modalHint.style.transform = "translateY(0)";
                } break;
                case "bottom": {
                    modalHint.style.top = "100vh";
                    modalHint.style.bottom = "0";
                    modalHint.style.transform = "translateY(-60%)";
                } break;
            }
        }

        async function backButtonListener() {
            if (nextButton.getAttribute("disabled") === "false") {

                nextButton.setAttribute("disabled", true);
                await modalControllerObject.animateLeftButton();
                nextButton.setAttribute("disabled", false);

                hintIndex--;
                if (hintIndex === 0) {
                    backButton.style.display = "none";
                } else if (hintIndex === hintList.length - 2) {
                    exitButton.style.display = "block";
                    nextButton.style.display = "block";
                    finishButton.style.display = "none";
                }

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
                if (hintIndex === 1) {
                    backButton.style.display = "block";
                } else if (hintIndex === hintList.length - 1) {
                    exitButton.style.display = "none";
                    nextButton.style.display = "none";
                    finishButton.style.display = "block";
                }

                tryToMove(hintIndex);
                showHint(hintIndex);
            }
        }

        async function exitButtonListener() {
            await modalControllerObject.animateButton(exitButton);
            modalHintContent.innerHTML = "Are you sure that you want to skip the tutorial?";
            noClickScreen.style.display = "none";
            hintHighlight.style.display = "none";
            modalHint.style.display = "none";
            localStorage.setItem("canStoreJsonTasks", false);
        }
        async function finishButtonListener() {
            await modalControllerObject.animateButton(exitButton);
            noClickScreen.style.display = "none";
            hintHighlight.style.display = "none";
            modalHint.style.display = "none";
            localStorage.setItem("canStoreJsonTasks", false);
        }

        async function startButtonListener() {
            await modalControllerObject.animateRightButton();
            backButton.innerHTML = "&lt;" // <
            nextButton.innerHTML = "&gt;" // >

            backButton.removeEventListener("click", exitButtonListener);
            nextButton.removeEventListener("click", startButtonListener);
            exitButton.addEventListener("click", exitButtonListener);
            finishButton.addEventListener("click", finishButtonListener);
            backButton.addEventListener("click", backButtonListener);
            nextButton.addEventListener("click", nextButtonListener);
            backButton.setAttribute("disabled", false);
            nextButton.setAttribute("disabled", false);

            exitButton.style.display = "block";
            buttonsContainer.style.width = "50%"
            buttonsContainer.style.justifyContent = "space-between";
            buttonsContainer.style.gap = "0";

            backButton.style.display = "none";
            showHint(hintIndex);
        }


        backButton.addEventListener("click", exitButtonListener);
        nextButton.addEventListener("click", startButtonListener);
    },

    animateSection(section) {
        const promise = new Promise(resolve => {

            const animation = section.animate([
                { backgroundColor: "#ccc" }
            ], { duration: 200, easing: "ease-out" })

            animation.addEventListener("finish", () =>
                resolve());
        })

        return promise;
    },

    calculateProgress() {
        const statsDataStored = JSON.parse(localStorage.getItem("statsData"));
        const hiraganaValues = Object.values(statsDataStored.hiragana);
        const katakanaValues = Object.values(statsDataStored.katakana);
        const hiraganaEntries = Object.entries(hiraganaValues);
        const katakanaEntries = Object.entries(katakanaValues);

        let hiraganaProgress = 0;

        // It calculates the hiragana progress
        for (let groupObject of hiraganaEntries) {
            let group = Object.values(groupObject[1]);

            for (let answer of group) {
                let idealValue = answer.wrong * 1.5 + 10;
                let percentage = answer.right * 100 / idealValue;
                let roundedPercentage = Math.round(percentage);
                if (roundedPercentage > 100) {
                    roundedPercentage = 100;
                }
                hiraganaProgress += roundedPercentage / 104;
            }
        }

        let katakanaProgress = 0;

        // It calculates the katakana progress
        for (let groupObject of katakanaEntries) {
            let group = Object.values(groupObject[1]);

            for (let answer of group) {
                let idealValue = answer.wrong * 1.5 + 10;
                let percentage = answer.right * 100 / idealValue;
                let roundedPercentage = Math.round(percentage);
                if (roundedPercentage > 100) {
                    roundedPercentage = 100;
                }
                katakanaProgress += roundedPercentage / 104;
            }
        }

        hiraganaProgress = hiraganaProgress.toFixed(2);
        this.progress.hiraganaProgressBar.style.setProperty("--progress", hiraganaProgress);
        this.progress.hiraganaProgressNumber.innerHTML = hiraganaProgress + "%";
        this.calculateLevel(hiraganaProgress, this.progress.hiraganaProgressText);

        katakanaProgress = katakanaProgress.toFixed(2);
        this.progress.katakanaProgressBar.style.setProperty("--progress", katakanaProgress);
        this.progress.katakanaProgressNumber.innerHTML = katakanaProgress + "%";
        this.calculateLevel(katakanaProgress, this.progress.katakanaProgressText);

    },

    calculateLevel(progress, textElement) {
        if (progress < 25) {
            textElement.innerHTML = "Beginner";
        } else if (progress < 50) {
            textElement.innerHTML = "Average";
        } else if (progress < 75) {
            textElement.innerHTML = "Skilled";
        } else if (progress < 100) {
            textElement.innerHTML = "Specialist";
        } else {
            textElement.innerHTML = "Master";
        }
    }
}
