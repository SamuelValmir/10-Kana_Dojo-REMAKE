"use strict";

class MatchMakerScreenInterface extends GameScreenInterface {
    constructor() {
        super(MatchMakerScreenInterface, false, 4);
    }

    htmlElement = document.querySelector(".match-maker-screen");
    boardElement = document.querySelector(".match-maker-screen .board");
    timeElement = document.querySelector(".match-maker-screen .time");
    movesElement = document.querySelector(".match-maker-screen .moves");

    kanaList = null;
    time = null;

    timeInterval = null;
    matchMakerModel = null;

    showStartScreen() {
        this.setMainColor(MATCH_MAKER_MAIN_COLOR_LIST);
        gameStartScreenInterface.show(this,
            this.mainColor,
            MATCH_MAKER_MAIN_COLOR_LIST,
            MATCH_MAKER_MAIN_BACKGROUND_IMAGE,
            MATCH_MAKER_GAME_TITLE,
            MATCH_MAKER_GAME_DESCRIPTION);
    }

    show(kanaList) {
        this.htmlElement.style.display = "grid";
        this.kanaList = kanaList;
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.gameModel = new MatchMakerModel(this.kanaList, this.dimension)
        this.startGame();
        this.setMoves(this.movesElement);
        // new GameScreenController(this.boardElement, this.dimension, this.gameModel);
    }

    hide() {
        this.htmlElement.style.display = "none";
    }

    startGame() {
        this.gameModel.createCards();
        this.time = this.gameModel.time;
        this.timeElement.innerHTML = this.time;
        this.drawCardsOnScreen();
    }

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

                    cardElement.classList.add("flip");
                    this.gameModel.increaseMove();
                    this.setMoves(this.movesElement);

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
    }

    createCardBackFront(cardElement, card) {
        let frontCardElement = document.createElement("div");
        frontCardElement.classList.add(CARD_FRONT);
        frontCardElement.style.backgroundColor = this.mainColor;
        
        let backCardElement = document.createElement("div");
        backCardElement.classList.add(CARD_BACK);
        backCardElement.innerHTML = card.content;
        backCardElement.style.backgroundColor = this.mainColor;

        cardElement.appendChild(frontCardElement);
        cardElement.appendChild(backCardElement);
    }
}
