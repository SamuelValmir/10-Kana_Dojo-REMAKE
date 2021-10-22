"use strict";

let modalQuizInterface = {
    htmlElement: document.querySelector(".modal-quiz"),
    firstShow: true,

    retakeButton: document.querySelector(".modal-quiz .retake-button"),
    exitButton: document.querySelector(".modal-quiz .exit-button"),

    modalControllerObject: undefined,

    show() {
        this.htmlElement.style.display = "flex";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize() {
        if (this.firstShow === true) {
            this.firstShow = false;

            this.modalControllerObject = new ModalController(this.retakeButton, this.exitButton)

            this.initializeButtons();
        }
    },

    initializeButtons() {
        let retakeButton = this.retakeButton;
        let exitButton = this.exitButton;

        retakeButton.addEventListener("click", async () => {
            await this.modalControllerObject.animateButton()
            this.hide();
        })

        exitButton.addEventListener("click", async () => {
            await this.buttons.animate(exitButton);

            this.hide();
            menuScreenInterface.hide();
        })
    },
}