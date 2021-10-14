"use strict";
let menuScreenInterface = {
    htmlElement: document.querySelector(".menu-screen"),
    firstShow: true,
    navOptions: {
        learnOption: document.querySelector(".learn-option"),
        playOption: document.querySelector(".play-option"),
    },

    screens: {
        learnScreen: document.querySelector(".menu-screen .learn-screen"),
        playScreen: document.querySelector(".menu-screen .play-screen"),
    },

    containersElement: document.querySelector(".menu-screen .containers"),
    scrollBar: document.querySelector(".menu-screen-nav .scroll-bar"),

    studySections: {
        htmlElement: document.querySelectorAll(".menu-screen .container .study-section"),
        referenceSection: {
            htmlElement: document.querySelector(".study-section-reference")
        },
        flashCardSection: {
            htmlElement: document.querySelector(".study-section-flash-card")
        }
    },

    show() {
        this.htmlElement.style.display = "block";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize() {
        // ----- Set the options of the learn option ----- 
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;

        let learnScreen = this.screens.learnScreen;
        let playScreen = this.screens.playScreen;

        let navModel = new NavModel;
        let navController = new NavController(learnOption, playOption, learnScreen, playScreen, this.containersElement, this.scrollBar);

        // It places the .container right after the .header
        let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
        this.containersElement.style.setProperty("margin-top", menuHeaderHeight + "px");

        if (this.firstShow === true) {
            this.firstShow = false;

            window.onresize = () => {
                let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
                this.containersElement.style.setProperty("margin-top", menuHeaderHeight + "px")
            }

            learnOption.addEventListener("click", () => {
                if (navModel.canAnimateLeftOption() === true) {
                    navController.animateLeftOption();
                }

            })
            playOption.addEventListener("click", () => {
                if (navModel.canAnimateRightOption() === true) {
                    navController.animateRightOption();
                }
            })

            // It makes the nav's scroll bar to move when container is scrolled
            this.containersElement.addEventListener("scroll", () => { navController.scrollListener(navModel) })

            // ----- Set study sections -----
            let referenceSection = this.studySections.referenceSection;
            let flashCardSection = this.studySections.flashCardSection;


            referenceSection.htmlElement.addEventListener("click", () => {
                menuScreenInterface.hide();
                referenceScreenInterface.show();
            })

            flashCardSection.htmlElement.addEventListener("click", () => {
                modalMainInterface.show();
            })
        }
    }
}