"use strict";

class EyeSpyScreenInterface extends GameScreenInterface {
    constructor() {
        super(EyeSpyScreenInterface, true, 2);
    }

    htmlElement = document.querySelector(".eye-spy-screen");
    boardElement = document.querySelector(".eye-spy-screen .board");
    timeElement = document.querySelector(".eye-spy-screen .time");
    sortedCardElement = document.querySelector(".eye-spy-screen .sorted-card");
    movesElement = document.querySelector(".eye-spy-screen .moves");

    kanaList = null;
    time = null;

    lastPromise = null;
    timeInterval = null;
    eyeSpyModel = null;

    showStartScreen() {
        this.setMainColor(EYE_SPY_MAIN_COLOR_LIST);
        gameStartScreenInterface.show(this,
            this.mainColor,
            EYE_SPY_MAIN_COLOR_LIST,
            EYE_SPY_MAIN_BACKGROUND_IMAGE,
            EYE_SPY_GAME_TITLE,
            EYE_SPY_GAME_DESCRIPTION);
    }

    show(kanaList) {
        this.htmlElement.style.display = "grid";
        this.kanaList = kanaList;
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);
        this.gameModel = new EyeSpyModel(this.kanaList, this.dimension);
        this.startGame();
        this.setMoves(this.movesElement);
    }

    hide() {
        this.htmlElement.style.display = "none";
    }

    startGame() {
        this.lastPromise = null;
        this.gameModel.createCards();
        this.time = this.gameModel.time;
        this.timeElement.innerHTML = this.time;
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
                                    this.gameModel.reset();
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
        let animationList = [];
        // ! It's been defined wrongly

        for (let i = 0; i < this.dimension; i++) {
            // console.log(1)

            let animation = cardsElementList[i].animate([
                { transform: "rotateY(360deg)" }
            ], 300);

            animation.pause();
            animationList.push(animation);

            for (let j = 0; j < this.dimension; j++) {
                if (j === 0) {
                    animationMatrix.push([])
                }
                animationMatrix[i][j] = animation;
            }
        }
        // console.log(animationMatrix)

        // animationMatrix = [
        //     [1, 2, 3],
        //     [4, 5, 6],
        //     [7, 8, 9]]

        // let line = 0;

        // let interval = setInterval(() => {
        // if (line < animationMatrix.length) {

        // console.log(animationMatrix[1])
        // for (let line of animationMatrix) {
        //     for (let animation of line) {
        //         console.log(animation)
        //         animation.play();
        //     }
        //     // console.log(animation)
        // }

        for (let animation of animationList) {
            // console.log(animation)
        }

        // line++;

        // } 
        // else {
        //     clearInterval(interval);
        // }
        // }, 1000)


        // let interval = setInterval(() => {
        //     console.log(i[0])
        //     console.log(i[1])
        //     i[0][1]++
        //     if (i[0][1] === 1) {
        //         i[1][1]++
        //     }

        // }, 500)

        //     let interval = setInterval(() => {
        //         if (i1 < 2) {
        //             let currentAnimation = animationMatrix[i1][i2];
        //             currentAnimation.play();
        //             i1++;

        //         } else {
        //             clearInterval(interval);
        //         }
        //     }, 100)
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