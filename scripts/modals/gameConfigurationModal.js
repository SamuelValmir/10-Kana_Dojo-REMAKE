"use strict";

class GameConfigurationModal {
    htmlElement = document.querySelector(".game-configuration-modal");

    timeElement = document.querySelector(".game-configuration-modal .time-container .game-time");
    bonusTimeElement = document.querySelector(".game-configuration-modal .time-container .bonus-time");

    dimensionElementList = document.querySelectorAll(".game-configuration-modal .dimension-container .dimension");

    switchElementList = document.querySelectorAll(".game-configuration-modal .switch");
    boardAnimationSwitchElement = document.querySelector(".game-configuration-modal .switch-board-animation");
    cardAnimationSwitchElement = document.querySelector(".game-configuration-modal .switch-card-animation");
    cardMarkerSwitchElement = document.querySelector(".game-configuration-modal .switch-card-match-marker");

    resetButton = document.querySelector(".game-configuration-modal .reset-button");
    doneButton = document.querySelector(".game-configuration-modal .done-button");
    cancelButton = document.querySelector(".game-configuration-modal .cancel-button");

    selectedDimensionOption = null;
    reference = null;
    mainColor = null;
    firstShow = true;

    configuration = {
        minutes: 0,
        seconds: "10",
        bonusTime: 5,
        dimensionX: 2,
        dimensionY: 2,
        boardAnimation: true,
        cardAnimation: true,
        cardMatchMarker: true
    }

    show(reference, mainColor, hslColorList) {
        this.htmlElement.style.display = "block";
        this.reference = reference;
        this.mainColor = mainColor;
        this.hslColorList = hslColorList;

        const htmlElementHeight = this.htmlElement.clientHeight;
        this.htmlElement.style.top = "-" + (htmlElementHeight * 1.5) + "px";

        let animation = this.htmlElement.animate([
            { top: "0px" }
        ], 500);

        animation.addEventListener("finish", () => {
            this.htmlElement.style.top = "0";
        });

        this.initialize();
    }

    initialize() {
        if (this.firstShow === true) {
            this.setDefaultValues();

            this.firstShow = false;
            // It adds mask in the inputs
            $(document).ready(function () {
                $(".game-configuration-modal .time-container .game-time").mask("0:00");
                $(".game-configuration-modal .time-container .bonus-time").mask("00");
            });

            // It adds outline on the input texts when it enter in focus, and removes when it outs
            const inputText = document.querySelectorAll(".game-configuration-modal .time-container input");
            inputText.forEach(input => {
                input.addEventListener("focus", () => {
                    input.style.outline = "solid 1px " + this.mainColor;
                })
                input.addEventListener("focusout", () => {
                    input.style.outline = "none";

                    let minutes;
                    let seconds;

                    if (input.classList.contains("game-time")) {
                        const doubleDotsIndex = input.value.indexOf(":");
                        if (doubleDotsIndex > 0) { // If found the ":"...
                            minutes = input.value.substring(0, 1);
                            seconds = input.value.substring(2);
                        } else {
                            input.value = "0:10";
                            minutes = 0;
                            seconds = 10;
                        }

                        if (seconds >= 60) {
                            input.value = minutes + ":" + 59;
                            seconds = 59;
                            // Seconds can't be more than 59
                        }

                        if (minutes <= 0 && seconds < 10) {
                            input.value = "0:10";
                            minutes = 0;
                            seconds = 10;
                            // time can't be less than 10
                        }

                        if (seconds.length === 1 && seconds < 10) {
                            input.value = minutes + ":" + 0 + seconds;
                        } else if (seconds.length === 0) {
                            input.value = minutes + ":00";
                            seconds = 0;
                        }

                    } else {
                        seconds = input.value;

                        if (seconds.length === 0) {
                            seconds = input.value = 0;
                            seconds = 0;
                        }
                    }
                })
            })

            // It adds click event listener in the dimensions options
            for (let i = 0; i < this.dimensionElementList.length; i++) {
                let dimensionElement = this.dimensionElementList[i];

                dimensionElement.addEventListener("click", (event) => {
                    if (event.target.getAttribute("selected") !== "true") {
                        this.dimensionElementList.forEach(dimensionElement => {
                            if (dimensionElement.getAttribute("selected") === "true") {
                                dimensionElement.setAttribute("selected", false);
                                this.hideSelectedDimension(dimensionElement);
                            }
                        })

                        event.target.setAttribute("selected", true);
                        this.showSelectedDimensionAnimation(event.target);

                        this.selectedDimensionOption = dimensionElement;
                    }
                })
            }

            // It adds click event listener in the switches
            let switchList = this.switchElementList;
            for (let i = 0; i < switchList.length; i++) {
                let switchElement = switchList[i];
                switchElement.addEventListener("click", () => {
                    if (switchElement.getAttribute("activated") === "true") {
                        switchElement.setAttribute("activated", false);
                        this.moveSwitchBallAnimation(switchElement, 0);
                        this.switchOpacityAnimation(switchElement, .6);

                    } else {
                        switchElement.setAttribute("activated", true);
                        this.moveSwitchBallAnimation(switchElement, 50);
                        this.switchOpacityAnimation(switchElement, 1);
                    }
                })
            }

            // It adds click event listener in the buttons
            this.resetButton.addEventListener("click", async () => {
                // await this.buttonAnimation(this.resetButton);
                this.setDefaultValues();
            })

            this.doneButton.addEventListener("click", async () => {
                // await this.buttonAnimation(this.doneButton);
                // ! I must make the animation with javascript and or wait the animation end

                await setTimeout(()=>{

                },250);

                this.setConfiguration();
                const htmlElementHeight = this.htmlElement.clientHeight;

                const animation = this.htmlElement.animate([
                    { top: "-" + htmlElementHeight + "px" }
                ], 500)

                animation.addEventListener("finish", () => {
                    this.htmlElement.style.top = "-" + htmlElementHeight + "px";
                })
            })

            document.addEventListener("click", (event) => {
                let isClickInsideConfigurationModal = this.htmlElement.contains(event.target);
                if (!isClickInsideConfigurationModal) {
                    console.log("exit")
                }
            })
        }
    }

    buttonAnimation(button) {
        const promise = new Promise(resolve => {
            const animation = button.animate([
                { transform: "scale(.9)" }
            ], { duration: 300, easing: "linear" })

            animation.addEventListener("finish", () => {
                resolve();
            })
        })

        return promise;
    }

    showSelectedDimensionAnimation(dimensionElement) {
        dimensionElement.animate([
            { transform: "scale(1.2)" }
        ], 150)
        dimensionElement.style.border = "2px solid " + this.mainColor;
        dimensionElement.style.backgroundColor = "white";
    }

    hideSelectedDimension(dimensionElement) {
        dimensionElement.style.border = "1px solid #333";
        dimensionElement.style.backgroundColor = "#BBC1E1";
    }

    hide() {
        this.htmlElement.style.display = "none";
    }

    setDefaultValues() {
        this.timeElement.value = "1:00";
        this.bonusTimeElement.value = "10";

        switch (this.reference.name) {
            case "MatchMakerScreenInterface": {
                this.dimensionElementList[0].innerHTML = "2x2";
                this.dimensionElementList[1].innerHTML = "4x2";
                this.dimensionElementList[2].innerHTML = "4x4";
                this.dimensionElementList[3].innerHTML = "5x4";
                this.dimensionElementList[4].innerHTML = "6x6";
            } break;

            case "EyeSpyScreenInterface": {
                this.dimensionElementList[0].innerHTML = "2x2";
                this.dimensionElementList[1].innerHTML = "3x3";
                this.dimensionElementList[2].innerHTML = "4x4";
                this.dimensionElementList[3].innerHTML = "5x5";
                this.dimensionElementList[4].innerHTML = "6x6";
            } break;
        }

        for (let i = 0; i < this.dimensionElementList.length; i++) {
            let dimensionElement = this.dimensionElementList[i];

            if (dimensionElement.getAttribute("selected") === "true") {
                dimensionElement.setAttribute("selected", false);
                this.hideSelectedDimension(dimensionElement);
            }

            if (i === 2) {
                dimensionElement.setAttribute("selected", true);
                dimensionElement.style.border = "2px solid rgb(168, 26, 26)";
                dimensionElement.style.backgroundColor = "white";

                this.selectedDimensionOption = dimensionElement;
            }
        }

        this.switchElementList.forEach(switchElement => {
            let switchBall = switchElement.children[0];
            switchBall.style.backgroundColor = this.mainColor;

            switchElement.setAttribute("activated", true);
            this.moveSwitchBallAnimation(switchElement, 50);
            this.switchOpacityAnimation(switchElement, 1);
        })

        const buttonList = document.querySelectorAll(".game-configuration-modal .button-container .button");
        buttonList.forEach(button => {
            const [hue, saturation, lightness] = this.hslColorList;
            button.style.backgroundColor = "hsl(" + (hue - 5) + "," + saturation + "%," + (lightness - 15) + "%)";


            const front = button.lastElementChild;
            front.style.backgroundColor = this.mainColor
        })


        this.setConfiguration();
    }

    setConfiguration() {
        let minutes = this.timeElement.value.substring(0, 1);
        let seconds = this.timeElement.value.substring(2);
        this.configuration.minutes = minutes;
        this.configuration.seconds = seconds;

        this.configuration.bonusTime = this.bonusTimeElement.value;

        this.dimensionElementList.forEach(dimensionElement => {
            if (dimensionElement.getAttribute("selected") === "true") {
                let dimensionX = dimensionElement.innerHTML.substring(0, 1);
                let dimensionY = dimensionElement.innerHTML.substring(2);

                this.configuration.dimensionX = dimensionX;
                this.configuration.dimensionY = dimensionY;
            }
        })

        this.configuration.boardAnimation = this.boardAnimationSwitchElement.getAttribute("activated");
        this.configuration.cardAnimation = this.cardAnimationSwitchElement.getAttribute("activated");
        this.configuration.cardMatchMarker = this.cardMarkerSwitchElement.getAttribute("activated");
    }

    moveSwitchBallAnimation(switchElement, margin) {
        const switchBall = switchElement.children[0];
        const animation = switchBall.animate([
            { marginLeft: margin + "%" }
        ], { duration: 500, easing: "ease" })

        animation.addEventListener("finish", () => {
            switchBall.style.marginLeft = margin + "%";
        })
    }

    switchOpacityAnimation(switchElement, opacity) {
        const animation = switchElement.animate([
            { opacity: opacity }
        ], { duration: 1000, easing: "ease" })

        animation.addEventListener("finish", () => {
            switchElement.style.opacity = opacity;
        })
    }
}