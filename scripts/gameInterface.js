"use strict";

// Contante variables
const CARD = "card";
const CARD_FRONT = "card-front";
const CARD_BACK = "card-back";


window.onload = () => {
    startGame();
    setMoves();
}

let startGame = () => {
    game.createCards();
    drawCardsOnScreen();
}

let drawCardsOnScreen = () => {
    // Making and adding the cards in html
    let boardElement = document.getElementsByClassName("board")[0];

    game.cards.forEach(card => {
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
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        game.increaseMove();
        setMoves();
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        let gameOverLayer = document.querySelector(".gameOver");
                        gameOverLayer.style.display = "grid";
                        setScore();
                    }, 1000)
                }
            } else {
                setTimeout(() => {
                    let firstCardElement = document.getElementById(game.firstCard.id);
                    let secondCardElement = document.getElementById(game.secondCard.id);

                    game.unFlipCards();
                    firstCardElement.classList.remove("flip");
                    secondCardElement.classList.remove("flip");
                }, 1000);
            }
        }
    }
}

let setMoves = () => {
    let a = document.querySelector(".moves span").innerHTML = game.moves;
}

let setScore = () => {
    let a = document.querySelector(".score span").innerHTML = game.moves;
}
