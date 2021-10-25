"use strict";

let modalQuizInterface = {
    htmlElement: document.querySelector(".modal-quiz"),
    firstShow: true,

    rightElement: document.querySelector(".modal-quiz .right-container .bottom"),
    wrongElement: document.querySelector(".modal-quiz .wrong-container .bottom"),
    scoreElement: document.querySelector(".modal-quiz .score-container .bottom"),

    retakeButton: document.querySelector(".modal-quiz .retake-button"),
    exitButton: document.querySelector(".modal-quiz .exit-button"),

    modalControllerObject: undefined,

    show(rightScore, wrongScore) {
        this.htmlElement.style.display = "flex";

        this.rightElement.innerHTML = rightScore;
        this.wrongElement.innerHTML = wrongScore;
        const score = (100 * rightScore) / (rightScore + wrongScore);
        this.scoreElement.innerHTML = score.toFixed(0) + "%";
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
            await this.modalControllerObject.animateLeftButton();
            const cards = quizScreenInterface.cards;
            quizScreenInterface.show(Cards.shuffle(cards));
            this.hide();
        })

        exitButton.addEventListener("click", async () => {
            await this.modalControllerObject.animateRightButton();
            this.hide();
            quizScreenInterface.hide();
            menuScreenInterface.show();
        })
    },
}