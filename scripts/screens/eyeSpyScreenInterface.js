//! I must fix the content of this screen
let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".eye-spy-screen"),
    boardElement: document.querySelector(".eye-spy-screen .board"),
    timeElement: document.querySelector(".eye-spy-screen .time"),
    sortedCardElement: document.querySelector(".eye-spy-screen .sorted-card"),

    mainColor: null,
    gameModel: eyeSpyModel,
    dimension: 5,
    kanaList: undefined,

    time: null,

    lastPromise: null,
    timeInterval: null,

    eyeSpyModel: null,

    showStartScreen() {
        const [hue, saturation, lightness] = EYE_SPY_MAIN_COLOR_LIST;
        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";

        gameStartScreenInterface.show(this, this.mainColor, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
    },

    show(kanaList) {
        this.htmlElement.style.display = "grid";
        this.kanaList = kanaList;
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.eyeSpyModel = new EyeSpyModel(this.kanaList, this.dimension);
        this.startGame();
        this.setMoves();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    startGame() {
        this.lastPromise = null;
        this.eyeSpyModel.createCards();
        this.time = this.eyeSpyModel.time;
        this.timeElement.innerHTML = this.time;
        this.drawCardsOnScreen();
    },

    drawCardsOnScreen() {
        // Making and adding the cards in html
        this.boardElement.innerHTML = "";

        this.eyeSpyModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;

            let frontCardElement = document.createElement("div");
            frontCardElement.classList.add(CARD_FRONT);
            frontCardElement.innerHTML = card.content;
            frontCardElement.style.backgroundColor = this.mainColor;

            cardElement.appendChild(frontCardElement);
            this.boardElement.appendChild(cardElement);

            cardElement.addEventListener('click', async () => {
                if (card.clickable === true) {
                    this.eyeSpyModel.increaseMove();
                    this.setMoves();

                    if (this.eyeSpyModel.checkMatch(card.id)) {
                        card.clickable = false;
                        if (this.timeInterval === null) {
                            this.timeInterval = setInterval(() => { // Update the time in the screen
                                this.timeElement.innerHTML = this.eyeSpyModel.time;
                                if (this.eyeSpyModel.time <= 0) {
                                    clearInterval(this.timeInterval);
                                    this.timeInterval = null;
                                    this.showGameOverScreen();
                                    this.eyeSpyModel.reset();
                                }
                            }, 1)
                        }
                        this.sortedCardElement.innerHTML = this.eyeSpyModel.sortedCard;

                        await this.cardMatchAnimation(cardElement, frontCardElement);

                        if (this.lastPromise !== null) {
                            this.lastPromise.then(() => {

                                if (this.eyeSpyModel.checkGameWin()) {
                                    this.boardElement.innerHTML = "";
                                    this.startGame();
                                }
                            })
                        }
                    }
                }
            });
            this.sortedCardElement.innerHTML = this.eyeSpyModel.sortedCard;
        });
    },

    cardMatchAnimation(cardElement, frontCardElement) {
        const promise = new Promise(resolve => {
            frontCardElement.innerHTML = "";
            frontCardElement.style.backgroundColor = "rgb(0, 200, 0)";
            const animation = cardElement.animate([
                { transform: "rotateY(360deg) scale(0)" }
            ], { duration: 600, easing: "ease-in" });

            animation.addEventListener("finish", () => {
                cardElement.style.transform = "scale(0)";
                resolve();
            })
        })
        if (this.eyeSpyModel.inLastCard === true) {
            this.lastPromise = promise;
        }
        return promise;

    },

    setSortedCard() {
        document.querySelector(".eye-spy-screen .sortedCard").innerHTML = this.eyeSpyModel.sorted - card;
    },

    setMoves() {
        document.querySelector(".eye-spy-screen .moves").innerHTML = this.eyeSpyModel.moves;
    },

    setScore() {
        document.querySelector(".eye-spy-screen  .score").innerHTML = this.eyeSpyModel.moves;
    },

    showGameOverScreen() {
        this.htmlElement.style.display = "none";
        gameOverScreenInterface.show(this, this.eyeSpyModel.matches);
    }

}