//! I must fix the content of this screen
let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".eye-spy-screen"),
    boardElement: document.querySelector(".eye-spy-screen .board"),
    timeElement: document.querySelector(".eye-spy-screen .time"),
    sortedCardElement: document.querySelector(".eye-spy-screen .sorted-card"),

    mainColor: null,
    gameModel: eyeSpyModel,
    dimension: 5,
    cards: undefined,

    time: null,

    lastPromise: null,
    timeInterval: null,

    showStartScreen() {
        const [hue, saturation, lightness] = EYE_SPY_MAIN_COLOR_LIST;
        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";

        gameStartScreenInterface.show(this, this.mainColor, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
    },

    show(cards) {
        this.htmlElement.style.display = "grid";
        this.cards = cards;
        this.startGame();
        console.log(this.gameModel.time)
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    startGame() {
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.gameModel.createCards(this.cards);
        this.lastPromise = null;

        this.time = this.gameModel.time;
        this.timeElement.innerHTML = this.time;
        this.drawCardsOnScreen();
        this.setMoves();
    },

    drawCardsOnScreen() {
        // Making and adding the cards in html
        let boardElement = this.boardElement;
        boardElement.innerHTML = "";

        this.gameModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;

            let frontCardElement = document.createElement("div");
            frontCardElement.classList.add(CARD_FRONT);
            frontCardElement.innerHTML = card.content;
            frontCardElement.style.backgroundColor = this.mainColor;

            cardElement.appendChild(frontCardElement);
            boardElement.appendChild(cardElement);

            cardElement.addEventListener('click', async () => {
                if (card.clickable === true) {
                    this.gameModel.increaseMove();
                    this.setMoves();

                    if (this.gameModel.checkMatch(card.id)) {
                        card.clickable = false;
                        if (this.timeInterval === null) {
                            this.timeInterval = setInterval(() => { // Update the time in the screen
                                this.timeElement.innerHTML = this.gameModel.time;
                                if (this.gameModel.time <= 0) {
                                    clearInterval(this.timeInterval);
                                    this.timeInterval = null;
                                    this.showGameOverScreen();
                                    this.gameModel.reset();
                                }
                            }, 1)
                        }
                        this.sortedCardElement.innerHTML = this.gameModel.sortedCard;

                        await this.cardMatchAnimation(cardElement, frontCardElement);

                        if (this.lastPromise !== null) {
                            this.lastPromise.then(() => {

                                if (this.gameModel.checkGameWin()) {
                                    boardElement.innerHTML = "";
                                    this.startGame();
                                }
                            })
                        }
                    }
                }
            });
            this.sortedCardElement.innerHTML = this.gameModel.sortedCard;
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
        if (this.gameModel.inLastCard === true) {
            this.lastPromise = promise;
        }
        return promise;

    },

    setSortedCard() {
        document.querySelector(".eye-spy-screen .sortedCard").innerHTML = this.gameModel.sorted - card;
    },

    setMoves() {
        document.querySelector(".eye-spy-screen .moves").innerHTML = this.gameModel.moves;
    },

    setScore() {
        document.querySelector(".eye-spy-screen  .score").innerHTML = this.gameModel.moves;
    },

    showGameOverScreen() {
        this.htmlElement.style.display = "none";
        gameOverScreenInterface.show(this, this.gameModel.matches);
    }

}