// Global variables
let kanaJson;

// Contante variables
const CARD = "card";
const CARD_FRONT = "card-front";
const CARD_BACK = "card-back";


window.onload = () => {
    fetch('./assets/kana.json')
        .then(response => response.json())
        .then(data => {
            kanaJson = data;
            startGame();
        })
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
    this.classList.toggle("flip");
}