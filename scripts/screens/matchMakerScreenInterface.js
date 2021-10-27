"use strict";

let matchMakerScreenInterface = {
    htmlElement: document.querySelector("board"),
    show(){

    },
    hide(){

    }
}
window.onload = () => {
    // startGame();
    // setMoves();
}

let startGame = () => {
    matchMakerModel.createCards();
    drawCardsOnScreen();
}

let drawCardsOnScreen = () => {
    // Making and adding the cards in html
    let boardElement = document.getElementsByClassName("board")[0];

    matchMakerModel.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.content = card.content;

        createCardBackFront(cardElement, card);

        cardElement.addEventListener('click', flipCard);
        boardElement.appendChild(cardElement);
    });
}

let createCardBackFront = (cardElement, card) => {
    let frontCardElement = document.createElement("div");
    frontCardElement.classList.add(CARD_FRONT);

    let backCardElement = document.createElement("div");
    backCardElement.classList.add(CARD_BACK);
    backCardElement.innerHTML = card.content;

    cardElement.appendChild(frontCardElement);
    cardElement.appendChild(backCardElement);
}

function flipCard() {
    if (matchMakerModel.setCard(this.id)) {
        this.classList.add("flip");
        matchMakerModel.increaseMove();
        setMoves();
        if (matchMakerModel.secondCard) {
            if (matchMakerModel.checkMatch()) {
                matchMakerModel.clearCards();
                if (matchMakerModel.checkGameOver()) {
                    setTimeout(() => {
                        let gameOverLayer = document.querySelector(".gameOver");
                        gameOverLayer.style.display = "grid";
                        setScore();
                    }, 1000)
                }
            } else {
                setTimeout(() => {
                    let firstCardElement = document.getElementById(matchMakerModel.firstCard.id);
                    let secondCardElement = document.getElementById(matchMakerModel.secondCard.id);

                    matchMakerModel.unFlipCards();
                    firstCardElement.classList.remove("flip");
                    secondCardElement.classList.remove("flip");
                }, 1000);
            }
        }
    }
}

let setMoves = () => {
    let a = document.querySelector(".moves span").innerHTML = matchMakerModel.moves;
}

let setScore = () => {
    let a = document.querySelector(".score span").innerHTML = matchMakerModel.moves;
}
