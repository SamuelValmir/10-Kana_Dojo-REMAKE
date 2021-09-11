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
    createCards();
}

let createCards = () => {
    let cards = [];

    // It puts each element/kana from kanaJson to cards array
    for (const family of Object.values(kanaJson)) {
        for (const kana of family) {
            cards.push(createPairOf(kana));
        }
    }

    // Duplicate a card
    cards = cards.flatMap(pair => pair);

    let a = [];
    for (let index = 0; index < 30; index++) {
        a.push(cards[index]);
        shuffle(a);
    }
    let boardElement = document.getElementsByClassName("board")[0];
    for (let i = 0; i < a.length; i++) {

        let cardElement = document.createElement("div");
        cardElement.id = a[i].id;
        cardElement.classList.add(CARD);
        cardElement.dataset.content = a[i].content;

        createCardBackFront(cardElement, a[i]);

        cardElement.addEventListener('click', flipCard);
        boardElement.appendChild(cardElement);
    }
}

function flipCard() {
    this.classList.toggle("flip");
}

let createCardBackFront = (cardElement, card) => {
    let frontCardElement = document.createElement("div");
    frontCardElement.classList.add(CARD_FRONT);
    frontCardElement.innerHTML = card.content;

    let backCardElement = document.createElement("div");
    backCardElement.classList.add(CARD_BACK);

    cardElement.appendChild(frontCardElement);
    cardElement.appendChild(backCardElement);
}

let createPairOf = (kana) => {
    return [
        { id: createId(kana), content: wanakana.toHiragana(kana), flipped: false },
        { id: createId(kana), content: wanakana.toHiragana(kana), flipped: false }
    ];
}

let createId = (kana) => {
    let num = Math.random() * 1000
    return kana + parseInt(num);
}

let shuffle = (list) => {
    let currentIndex = list.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
    }
}