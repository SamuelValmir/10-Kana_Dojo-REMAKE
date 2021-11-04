"use strict";

let matchMakerScreenInterface = {
    htmlElement: document.querySelector(".match-maker-screen"),
    boardElement: document.querySelector(".match-maker-screen .board"),
    gameModel: matchMakerModel,
    dimension: 4,
    cards: undefined,

    showStartScreen() {
        gameStartScreenInterface.show(this, MATCH_MAKER_MAIN_COLOR_LIST, MATCH_MAKER_MAIN_BACKGROUND_IMAGE, MATCH_MAKER_GAME_TITLE, MATCH_MAKER_GAME_DESCRIPTION);
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
            this.boardElement.appendChild(cardElement);
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
