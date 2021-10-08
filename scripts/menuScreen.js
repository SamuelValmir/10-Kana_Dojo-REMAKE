"use strict";
let menuScreen = {
    htmlElement: document.querySelector(".menu-screen"),
    navOptions: {
        // htmlElement: navOptions = document.querySelector(".menu-screen-nav").children,
        learnOption: {
            htmlElement: document.querySelector(".learn-option"),
            isSelected: true,
            animate() {
                let playOption = menuScreen.navOptions.playOption;
                if (playOption.isSelected === true && this.isSelected === false) {
                    console.log(1)
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
                console.log(2)
                let learnOption = menuScreen.navOptions.learnOption;
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
        this.reset();
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


        learnOption.htmlElement.addEventListener("click", () => {
            learnOption.animate();
        })
        playOption.htmlElement.addEventListener("click", () => {
            playOption.animate();
        })


        // ----- Set study sections -----
        let referenceSection = this.studySections.referenceSection;
        let flashCardSection = this.studySections.flashCardSection;


        referenceSection.htmlElement.addEventListener("click", () =>{
            menuScreen.hide();
            referenceScreen.show();
        })
                    
        flashCardSection.htmlElement.addEventListener("click", () =>{
            modalMainInterface.show();
        })
    },

    reset() {
        let learnOption = this.navOptions.learnOption;
        let playOption = this.navOptions.playOption;

        learnOption.htmlElement.removeEventListener("click", () => {
            learnOption.animate();
        })

        playOption.htmlElement.removeEventListener("click", () => {
            playOption.animate();
        })

        let referenceSection = this.studySections.referenceSection;
        let flashCardSection = this.studySections.flashCardSection;


        referenceSection.htmlElement.removeEventListener("click", () =>{
            menuScreen.hide();
            referenceScreen.show();
        })
                    
        flashCardSection.htmlElement.removeEventListener("click", () =>{
            modalMainInterface.show();
        })
    }
}


