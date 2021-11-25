"use strict";

class EyeSpyScreenInterface extends GameScreenInterface {
    constructor() {
        let returnButton = document.querySelector(".eye-spy-screen .return-button");
        let returnButtonHighlight = document.querySelector(".eye-spy-screen .return-button-highlight");
        super(returnButton, returnButtonHighlight);
        this.gameConfigurationModal = new GameConfigurationModal();
    }

    htmlElement = document.querySelector(".eye-spy-screen");
    boardElement = document.querySelector(".eye-spy-screen .board");
    timeElement = document.querySelector(".eye-spy-screen .time");
    sortedCardElement = document.querySelector(".eye-spy-screen .sorted-card");
    movesElement = document.querySelector(".eye-spy-screen .moves");

    showStartScreen(gameConfiguration) {
        this.setMainColor(EYE_SPY_MAIN_COLOR_LIST);
        gameStartScreenInterface.show(this,
            EyeSpyScreenInterface,
            this.mainColor,
            EYE_SPY_MAIN_COLOR_LIST,
            EYE_SPY_MAIN_BACKGROUND_IMAGE,
            EYE_SPY_GAME_TITLE,
            EYE_SPY_GAME_DESCRIPTION,
            this.gameConfigurationModal,
            gameConfiguration);
    }

    show(kanaList, gameConfiguration) {
        this.setVariables(kanaList, gameConfiguration);
        this.gameModel = new EyeSpyModel(this.kanaList, gameConfiguration);
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

            let frontCardElement = document.createElement("div");
            frontCardElement.classList.add(CARD_FRONT);
            frontCardElement.innerHTML = card.content;
            frontCardElement.style.backgroundColor = this.mainColor;

            cardElement.appendChild(frontCardElement);
            this.boardElement.appendChild(cardElement);

            cardElement.addEventListener('click', async () => {
                if (card.clickable === true) {
                    this.gameModel.increaseMove();
                    this.setMoves(this.movesElement);

                    if (this.gameModel.checkMatch(card.id)) {
                        card.clickable = false;
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
                        this.sortedCardElement.innerHTML = this.gameModel.sortedCard;

                        await this.cardMatchAnimation(cardElement, frontCardElement);

                        if (this.lastPromise !== null) {
                            this.lastPromise.then(() => {

                                if (this.gameModel.checkGameWin()) {
                                    this.startGame();
                                }
                            })
                        }
                    }
                }
            });
            this.sortedCardElement.innerHTML = this.gameModel.sortedCard;
        });
        this.animateBoard();
    }

    animateBoard() {
        let cardsElementList = this.boardElement.children;
        let animationMatrix = [];

        let j = -1;
        for (let i = 0; i < cardsElementList.length; i++) {

            cardsElementList[i].style.transform = "rotateX(-90deg)"
            let animation = cardsElementList[i].animate([
                { transform: "rotateX(0deg)" }
            ], { duration: 200, easing: "linear" });

            animation.pause();

            animation.addEventListener("finish", () => {
                cardsElementList[i].style.transform = "initial"
            })

            // It makes a matrix with the animations
            if (i % this.dimension === 0) {
                animationMatrix.push([])
                j++;
            }

            animationMatrix[j][i % this.dimension] = animation;
        }

        let line = 0;

        // It plays the animation for each line
        let interval = setInterval(() => {
            for (let animation of animationMatrix[line]) {
                animation.play();
            }
            line++;
            if (line === animationMatrix.length) {
                clearInterval(interval);
            }
        }, 150)
    }

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

    }

    setSortedCard() {
        document.querySelector(".eye-spy-screen .sortedCard").innerHTML = this.gameModel.sorted - card;
    }
}