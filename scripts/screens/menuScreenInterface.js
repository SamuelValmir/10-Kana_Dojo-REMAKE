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
        katakanaProgress: document.querySelector(".menu-screen .progress-container-katakana"),
    },

    show() {
        this.htmlElement.style.display = "block";
        this.isShowing = true;
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;

        this.headerController.nav.closeMenuContent();
        this.navModel.menuContentIsShowing = false;
    },

    initialize() {
        // ----- Set the options of the learn option ----- 
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;
        let learnOptionHighlight = this.navOptions.learnOptionHighlight;
        let playOptionHighlight = this.navOptions.playOptionHighlight;

        let learnScreen = this.screens.learnScreen;
        let playScreen = this.screens.playScreen;

        const NavModelObject = new NavModel("left");
        const NavControllerObject = new NavController(learnOption, learnOptionHighlight, playOption, playOptionHighlight, "left", learnScreen, playScreen, this.containersElement, this.scrollBar, this.menuButton);
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

            this.games.eyeSpyElement.addEventListener("click", () => {
                this.hide();
                new EyeSpyScreenInterface().showStartScreen();
            })
            
            this.games.matchMakerElement.addEventListener("click", () => {
                this.hide();
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


            referenceSection.addEventListener("click", () => {
                menuScreenInterface.hide();
                referenceScreenInterface.show();
            })

            flashCardSection.addEventListener("click", () => {
                modalMainInterface.show();
                modalMainInterface.leadsTo = FLASH_CARD_SCREEN;
            })

            quizSection.addEventListener("click", () => {
                modalMainInterface.show();
                modalMainInterface.leadsTo = QUIZ_SCREEN;
            })

            this.progress.hiraganaProgress.addEventListener("click", () => {
                this.hide();
                statsScreenInterface.show("left");
            })

            this.progress.katakanaProgress.addEventListener("click", () => {
                this.hide();
                statsScreenInterface.show("right");
            })
        }
    }
}