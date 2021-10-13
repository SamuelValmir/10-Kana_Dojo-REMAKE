"use strict";
let menuScreenInterface = {
    htmlElement: document.querySelector(".menu-screen"),
    firstShow: true,
    navOptions: {
        learnOption: {
            htmlElement: document.querySelector(".learn-option"),
            isSelected: true,
            animate() {
                let playOption = menuScreenInterface.navOptions.playOption;
                if (playOption.isSelected === true && this.isSelected === false) {
                    this.isSelected = true;
                    playOption.isSelected = false;

                    this.htmlElement.classList.add("highlight");
                    playOption.htmlElement.classList.remove("highlight");

                    this.htmlElement.style.borderBottom = "5px solid white";
                    playOption.htmlElement.style.borderBottom = "none";
                }
            }

        },
        playOption: {
            htmlElement: document.querySelector(".play-option"),
            isSelected: false,
            animate() {
                let learnOption = menuScreenInterface.navOptions.learnOption;
                if (learnOption.isSelected === true && this.isSelected === false) {
                    this.isSelected = true;
                    learnOption.isSelected = false;

                    this.htmlElement.classList.add("highlight");
                    learnOption.htmlElement.classList.remove("highlight");

                    this.htmlElement.style.borderBottom = "5px solid white";
                    learnOption.htmlElement.style.borderBottom = "none";
                }
            }
        }
    },

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
        document.querySelector(".menu-screen .header").style.setProperty("position", "none");
        document.querySelector(".menu-screen .containers").style.setProperty("margin-top", "1000px")
    },

    initialize() {

        // ----- Set the options of the learn option ----- 
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;

        learnOption.isSelected = true;
        playOption.isSelected = false;

        learnOption.htmlElement.style.borderBottom = "5px solid white";
        playOption.htmlElement.style.borderBottom = "none";

        learnOption.htmlElement.classList.remove("highlight");
        playOption.htmlElement.classList.remove("highlight");

        // It places the .container right after the .header
        let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
        document.querySelector(".menu-screen .containers").style.setProperty("margin-top", menuHeaderHeight + "px")

        window.onresize = () => {
            let menuHeaderHeight = document.querySelector(".menu-screen .header").clientHeight;
            document.querySelector(".menu-screen .containers").style.setProperty("margin-top", menuHeaderHeight + "px")
        }

        if (this.firstShow === true) {
            this.firstShow = false;
            learnOption.htmlElement.addEventListener("click", () => {
                this.navOptions.learnOption.animate();

            })
            playOption.htmlElement.addEventListener("click", () => {
                this.navOptions.playOption.animate()
            })

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