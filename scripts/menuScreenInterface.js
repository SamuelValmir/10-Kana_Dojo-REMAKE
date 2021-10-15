"use strict";
let menuScreenInterface = {
    htmlElement: document.querySelector(".menu-screen"),
    isShowing: false,
    firstShow: true,
    menuButton: document.querySelector(".menu-screen .menu-button"),
    navOptions: {
        learnOption: document.querySelector(".menu-screen .learn-option"),
        playOption: document.querySelector(".menu-screen .play-option"),
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
            htmlElement: document.querySelector(".menu-screen .study-section-reference")
        },
        flashCardSection: {
            htmlElement: document.querySelector(".menu-screen .study-section-flash-card")
        }
    },

    show() {
        this.htmlElement.style.display = "block";
        this.isShowing = true;
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;
    },

    initialize() {
        // ----- Set the options of the learn option ----- 
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;

        let learnScreen = this.screens.learnScreen;
        let playScreen = this.screens.playScreen;

        const NavModelObject = new NavModel;
        const NavControllerObject = new NavController(learnOption, playOption, learnScreen, playScreen, this.containersElement, this.scrollBar, this.menuButton);

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
                await NavControllerObject.animateMenuButton();
                NavModelObject.menuContentIsShowing = true;
            })

            learnOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateLeftOption() === true) {
                    NavControllerObject.animateLeftOption();
                }

            })
            playOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateRightOption() === true) {
                    NavControllerObject.animateRightOption();
                }
            })

            window.addEventListener("click", (event) => {
                if (this.isShowing === true) {
                    if (NavModelObject.menuContentIsShowing === true){
                        NavControllerObject.tryCloseMenuContent(event.target);
                        //! I must try to animate the menuContent
                        NavModelObject.menuContentIsShowing = false;
                    }
                }
            })

            // It makes the nav's scroll bar to move when container is scrolled
            this.containersElement.addEventListener("scroll", () => { NavControllerObject.scrollListener(NavModelObject) })

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