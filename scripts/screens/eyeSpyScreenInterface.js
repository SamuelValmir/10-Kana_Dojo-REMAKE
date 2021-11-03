//! I must fix the content of this screen
let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".eye-spy"),
    boardElement: document.querySelector(".eye-spy .board"),
    mainColor: null,
    gameModel: eyeSpyModel,
    dimension: 5,
    cards: undefined,

    showStartScreen() {
        const [hue, saturation, lightness] = EYE_SPY_MAIN_COLOR_LIST;
        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";

        gameStartScreenInterface.show(this, this.mainColor, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
    },

    show(cards) {
        this.htmlElement.style.display = "grid";
        this.cards = cards;
        this.startGame();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    startGame() {
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.gameModel.createCards(this.cards);
        this.drawCardsOnScreen();
        this.setMoves();
    },

    drawCardsOnScreen() {
        // Making and adding the cards in html
        let boardElement = this.boardElement;

        this.gameModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;

            let frontCardElement = document.createElement("div");
            frontCardElement.classList.add(CARD_FRONT);
            frontCardElement.innerHTML = card.content;
            frontCardElement.style.backgroundColor = this.mainColor;

            cardElement.addEventListener('click', () => {
                this.gameModel.increaseMove();
                this.setMoves();

                if (this.gameModel.checkMatch(card.id)) {

                    this.cardMatchAnimation(cardElement, frontCardElement);
                    if (this.gameModel.checkGameOver()) {
                        setTimeout(() => {
                            let gameOverLayer = document.querySelector(".gameOver");
                            gameOverLayer.style.display = "grid";
                            setScore();
                        }, 1000)
                    }
                }
            });

            cardElement.appendChild(frontCardElement);
            boardElement.appendChild(cardElement);
        });
    },

    cardMatchAnimation(cardElement, frontCardElement) {
        frontCardElement.innerHTML = "";
        frontCardElement.style.backgroundColor = "rgb(0, 200, 0)";
        const animation = cardElement.animate([
            {transform: "rotateY(360deg) scale(0)"}
        ], {duration: 600, easing: "ease-in"});

        animation.addEventListener("finish", ()=>{
            cardElement.style.transform = "scale(0)";
        })
    },

    setSortedCard() {
        document.querySelector(".eye-spy .sortedCard").innerHTML = this.gameModel.sorted - card;
    },

    setMoves() {
        document.querySelector(".eye-spy .moves").innerHTML = this.gameModel.moves;
    },

    setScore() {
        document.querySelector(".eye-spy  .score").innerHTML = this.gameModel.moves;
    }

}