//! I must fix the content of this screen
let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".eye-spy"),
    boardElement: document.querySelector(".eye-spy .board"),
    cards: undefined,

    showStartScreen() {
        gameStartScreenInterface.show(this, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
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
        if (this.itHasCurrentIcon === true) {
            console.log("it has current icon")
        }

        this.gameScreenInterface.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.gameModel.createCards(this.gameScreenInterface.cards);
        this.drawCardsOnScreen();
        this.setMoves();
    },

    drawCardsOnScreen() {
        // Making and adding the cards in html
        let boardElement = this.gameScreenInterface.boardElement;

        this.gameModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;

            this.createCardBackFront(cardElement, card);

            cardElement.addEventListener('click', () => {
                if (this.gameModel.setCard(card.id)) {
                    cardElement.classList.add("flip");
                    this.gameModel.increaseMove();
                    this.setMoves();

                    if (this.gameModel.secondCard) {
                        if (this.gameModel.checkMatch()) {
                            this.gameModel.clearCards();
                            if (this.gameModel.checkGameOver()) {
                                setTimeout(() => {
                                    let gameOverLayer = document.querySelector(".gameOver");
                                    gameOverLayer.style.display = "grid";
                                    setScore();
                                }, 1000)
                            }
                        } else {
                            setTimeout(() => {
                                let firstCardElement = document.getElementById(this.gameModel.firstCard.id);
                                let secondCardElement = document.getElementById(this.gameModel.secondCard.id);

                                this.gameModel.unFlipCards();
                                firstCardElement.classList.remove("flip");
                                secondCardElement.classList.remove("flip");
                            }, 1000);
                        }
                    }
                }
            });
            boardElement.appendChild(cardElement);
        });
    },


    createCardBackFront(cardElement, card) {
        let frontCardElement = document.createElement("div");
        frontCardElement.classList.add(CARD_FRONT);

        let backCardElement = document.createElement("div");
        backCardElement.classList.add(CARD_BACK);
        backCardElement.innerHTML = card.content;

        cardElement.appendChild(frontCardElement);
        cardElement.appendChild(backCardElement);
    },

    setMoves() {
        document.querySelector(".moves").innerHTML = this.gameModel.moves;
    },

    setScore() {
        document.querySelector(".score").innerHTML = this.gameModel.moves;
    }

}