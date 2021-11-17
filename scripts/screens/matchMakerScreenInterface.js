"use strict";

class MatchMakerScreenInterface extends GameScreenInterface {
    constructor() {
        let returnButton = document.querySelector(".match-maker-screen .return-button");
        let returnButtonHighlight = document.querySelector(".match-maker-screen .return-button-highlight");
        super(MatchMakerScreenInterface, returnButton, returnButtonHighlight);
    }

    htmlElement = document.querySelector(".match-maker-screen");
    boardElement = document.querySelector(".match-maker-screen .board");
    returnButton = document.querySelector(".match-maker-screen .return-button");
    returnButtonHighlight = document.querySelector(".match-maker-screen .return-button-highlight");
    timeElement = document.querySelector(".match-maker-screen .time");
    movesElement = document.querySelector(".match-maker-screen .moves");

    showStartScreen(gameConfiguration) {
        this.setMainColor(MATCH_MAKER_MAIN_COLOR_LIST);
        gameStartScreenInterface.show(this,
            this.mainColor,
            MATCH_MAKER_MAIN_COLOR_LIST,
            MATCH_MAKER_MAIN_BACKGROUND_IMAGE,
            MATCH_MAKER_GAME_TITLE,
            MATCH_MAKER_GAME_DESCRIPTION,
            gameConfiguration);
    }

    show(kanaList, gameConfiguration) {
        this.setVariables(kanaList, gameConfiguration);
        this.gameModel = new MatchMakerModel(this.kanaList, gameConfiguration);
        this.currentGameScreenInterface = this;
        this.setMoves(this.movesElement);
        this.startGame();
    }

    startGame() {
        super.startGame();
        this.drawCardsOnScreen();
    }

    drawCardsOnScreen() {
        // Making and adding the cards in html
        this.boardElement.innerHTML = "";

        this.gameModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;
            this.createCardBackFront(cardElement, card);

            cardElement.addEventListener('click', async () => {
                if (this.gameModel.setCard(card.id)) {
                    if (this.timeInterval === null) {
                        this.timeInterval = setInterval(() => { // Update the time in the screen
                            this.timeElement.innerHTML = this.gameModel.time;
                            if (this.gameModel.time <= 0) {
                                clearInterval(this.timeInterval);
                                this.timeInterval = null;
                                this.showGameOverScreen();
                            }
                        }, 1)
                    }

                    cardElement.classList.add("flip");
                    this.gameModel.increaseMove();
                    this.setMoves(this.movesElement);

                    if (this.gameModel.secondCard) {
                        if (this.gameModel.checkMatch()) {
                            if (this.gameModel.checkGameOver()) {
                                setTimeout(() => {
                                    let gameOverLayer = document.querySelector(".gameOver");
                                    gameOverLayer.style.display = "grid";
                                    setScore();
                                }, 1000)
                            }

                            await this.cardMatchAnimation();
                            if (this.lastPromise !== null) {
                                this.lastPromise.then(() => {

                                    if (this.gameModel.checkGameWin()) {
                                        this.startGame();
                                    }
                                })
                            }
                            this.gameModel.clearCards();

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
        this.animateBoard();
    }

    cardMatchAnimation() {
        const promise = new Promise(resolve => {
            let firstCardElement = document.getElementById(this.gameModel.firstCard.id);
            let secondCardElement = document.getElementById(this.gameModel.secondCard.id);

            const animation = firstCardElement.animate([
                { border: "4px solid yellow" }
            ], { duration: 2000, easing: "linear" });

            secondCardElement.animate([
                { border: "4px solid yellow" }
            ], { duration: 2000, easing: "linear" });

            animation.addEventListener("finish", () => {
                firstCardElement.style.border = "4px solid yellow";
                secondCardElement.style.border = "4px solid yellow";
                resolve();
            })
        })
        if (this.gameModel.inLastCard === true) {
            this.lastPromise = promise;
        }
        return promise;
    }

    animateBoard() {
        let cardsElementList = this.boardElement.children;
        let animationList = [];

        for (let i = 0; i < cardsElementList.length; i++) {

            let animation = cardsElementList[i].animate([
                { transform: "rotateY(360deg)" }
            ], 300);

            animation.pause();
            animationList.push(animation)
        }

        let index = 0;
        let interval = setInterval(() => {
            if (index < animationList.length) {
                let currentAnimation = animationList[index];
                currentAnimation.play();
                index++;

            } else {
                clearInterval(interval);
            }
        }, 50)
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
