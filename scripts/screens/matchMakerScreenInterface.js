"use strict";

class MatchMakerScreenInterface extends GameScreenInterface {
    constructor() {
        let returnButton = document.querySelector(".match-maker-screen .return-button");
        let returnButtonHighlight = document.querySelector(".match-maker-screen .return-button-highlight");
        super(returnButton, returnButtonHighlight);
        this.gameConfigurationModal = new GameConfigurationModal();
    }

    htmlElement = document.querySelector(".match-maker-screen");
    boardElement = document.querySelector(".match-maker-screen .board");
    timeElement = document.querySelector(".match-maker-screen .time");
    bonusTimeElement = document.querySelector(".match-maker-screen .bonus-time");
    movesElement = document.querySelector(".match-maker-screen .moves");

    showStartScreen() {
        this.setMainColor(MATCH_MAKER_MAIN_COLOR_LIST);
        gameStartScreenInterface.show(this,
            MatchMakerScreenInterface,
            this.mainColor,
            MATCH_MAKER_MAIN_COLOR_LIST,
            MATCH_MAKER_MAIN_BACKGROUND_IMAGE,
            MATCH_MAKER_GAME_TITLE,
            MATCH_MAKER_GAME_DESCRIPTION,
            MATCH_MAKER_BUTTON_BOX_SHADOW_COLOR,
            this.gameConfigurationModal);
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
                            this.updateTime();
                            if (this.gameModel.time < 0) {
                                clearInterval(this.timeInterval);
                                this.showGameOverScreen();
                            }
                        }, 1);
                    }

                    if (this.gameConfigurationModal.configuration.cardAnimation === "true") {
                        this.cardFlipAnimation(cardElement, 300);
                    } else {
                        this.cardFlipAnimation(cardElement, 0);
                    }
                    this.gameModel.increaseMove();
                    this.setMoves(this.movesElement);

                    if (this.gameModel.secondCard) {
                        let firstCardElement = document.getElementById(this.gameModel.firstCard.id);
                        let secondCardElement = document.getElementById(this.gameModel.secondCard.id);

                        if (this.gameModel.checkMatch()) {
                            if (this.gameConfigurationModal.configuration.cardMatchMarker === "true") {
                                await this.cardMatchAnimation(firstCardElement, secondCardElement);
                                if (this.lastPromise !== null) {
                                    this.lastPromise.then(() => {

                                        if (this.gameModel.checkGameWin()) {
                                            this.bonusTimeAnimation();
                                            this.startGame();
                                        }
                                    })
                                }
                                
                            } else {
                                this.gameModel.clearCards();
                                
                                setTimeout(() => { // This is to wait for the card animation to end
                                    if (this.gameModel.checkGameWin()) {
                                        this.bonusTimeAnimation();
                                        this.startGame();
                                    }
                                }, 500)
                            }

                        } else {
                            setTimeout(() => {
                                this.gameModel.unFlipCards();
                                if (this.gameConfigurationModal.configuration.cardAnimation === "true") {
                                    this.cardUnFlipAnimation(firstCardElement, 300);
                                    this.cardUnFlipAnimation(secondCardElement, 300);
                                } else{
                                    this.cardUnFlipAnimation(firstCardElement,0);
                                    this.cardUnFlipAnimation(secondCardElement,0);                                   
                                }
                            }, 1000);
                        }
                    }
                }
            });
            this.boardElement.appendChild(cardElement);
        });


        if (this.gameConfigurationModal.configuration.boardAnimation === "true") {
            this.animateBoard();
        }
    }

    cardFlipAnimation(card, duration) {
        const animation = card.animate([
            { transform: "rotateY(180deg)" }
        ], { duration: duration, fill: "forwards" });

        animation.addEventListener("finish", () => {
            card.style.transform = "rotateY(180deg)";
        })
    }

    cardUnFlipAnimation(card, duration) {
        const animation = card.animate([
            { transform: "rotateY(0deg)" }
        ], { duration: duration, fill: "forwards" });

        animation.addEventListener("finish", () => {
            card.style.transform = "rotateY(0deg)";
        })
    }

    cardMatchAnimation(firstCardElement, secondCardElement) {
        const promise = new Promise(resolve => {
            this.gameModel.clearCards();
            let animation;

            // It animates the card back side and front side
            for (let i = 0; i < firstCardElement.children.length; i++) {
                let face = firstCardElement.children[i]

                animation = face.animate([
                    { border: ".2rem solid yellow" }
                ], { duration: 500, easing: "linear" });
            }

            for (let i = 0; i < secondCardElement.children.length; i++) {
                let face = secondCardElement.children[i]

                face.animate([
                    { border: ".2rem solid yellow" }
                ], { duration: 500, easing: "linear" });
            }

            animation.addEventListener("finish", () => {
                firstCardElement.children[0].style.border = ".2rem solid yellow";
                firstCardElement.children[1].style.border = ".2rem solid yellow";
                secondCardElement.children[0].style.border = ".2rem solid yellow";
                secondCardElement.children[1].style.border = ".2rem solid yellow";
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
