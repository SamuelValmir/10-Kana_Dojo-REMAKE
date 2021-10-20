let quizScreenInterface = {
    htmlElement: document.querySelector(".quiz-screen"),
    firstShow: true,
    inputText: document.querySelector(".quiz-screen .footer input"),
    text: document.querySelector('.quiz-screen .footer .text'),
    verticalLine: document.querySelector(".quiz-screen .vertical-line"),
    returnButton: document.querySelector(".quiz-screen .return-button"),
    returnButtonHighlight: document.querySelector(".quiz-screen .return-button-highlight"),

    wrongCounter: document.querySelector(".quiz-screen .wrong-counter"),
    cardsCounter: document.querySelector(".quiz-screen .cards-counter"),
    rightCounter: document.querySelector(".quiz-screen .right-counter"),

    card: document.querySelector(".quiz-screen .card"),

    quizScreenModelObject: undefined,

    show(cards) {
        this.htmlElement.style.display = "flex";
        this.initialize(cards);
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize(cards) {
        if (this.firstShow === true) {
            this.firstShow = false;

            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, undefined);
            // this.headerController = HeaderControllerObject;    

            this.quizScreenModelObject = new QuizScreenModel(cards)

            this.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();
                this.hide();
                menuScreenInterface.show();
            })

            this.inputText.addEventListener("input", () => {
                this.text.innerHTML = this.inputText.value;

                if (this.inputText.value.length === 0) {
                    this.verticalLine.style.display = "block";
                } else {
                    this.verticalLine.style.display = "none"
                }
            })

            this.inputText.addEventListener("blur", () => {
                this.nextCard();
            })

            this.inputText.addEventListener("keypress", event => {
                if (event.key === "Enter" || event.keyCode === "13") {
                    this.nextCard();
                }
            })

            this.inputText.focus();
            this.setCurrentCard();
            this.updateCardsCounter();
        }
    },

    updateWrongCounter() {
        this.wrongCounter.innerHTML = this.quizScreenModelObject.wrongCounter;
    },

    updateRightCounter() {
        this.rightCounter.innerHTML = this.quizScreenModelObject.rightCounter;
    },

    updateCardsCounter() {
        const currentPosition = this.quizScreenModelObject.currentPosition;
        const cardsLength = this.quizScreenModelObject.cards.length;
        this.cardsCounter.innerHTML = currentPosition + " / " + cardsLength;

    },

    setCurrentCard() {
        this.card.innerHTML = this.quizScreenModelObject.currentCard;
    },

    nextCard() {
        if (this.quizScreenModelObject.checkAnswer(this.inputText.value) === true) {
            this.updateRightCounter();
        } else {
            this.updateWrongCounter();
        }

        this.setCurrentCard();
        this.updateCardsCounter();
        this.inputText.value = '';
        this.text.innerHTML = '';
        this.inputText.focus();
        this.verticalLine.style.display = "block";
    }

}