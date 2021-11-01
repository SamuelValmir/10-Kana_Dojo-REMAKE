"use strict";

let matchMakerModel = {
    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,
    moves: 0,

    index: 0,
    counter: 16,
    currentCards: [],

    setCard(id) {
        let card = this.cards.filter((card) => card.id == id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        //* (!this.firstCard) == (firstCard == null)
        if (!this.firstCard) {
            this.firstCard = card;
            card.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            card.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch() {
        if (this.firstCard && this.secondCard) {
            return this.firstCard.content === this.secondCard.content;
        }
        return false;
    },

    clearCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unFlipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    createCards(kanaList) {
        this.cards = [];

        for (const kana of kanaList) {
            this.cards.push(this.createPairOf(kana));
        }

        // It makes a list with only elements, without objects
        this.cards = this.cards.flatMap(pair => pair);

        let index = this.index;
        let counter = this.counter;

        for (index; index < counter; index++) {
            this.currentCards.push(this.cards[index]);
        }
        this.currentCards = Cards.shuffle(this.currentCards);
    },

    createPairOf(kana) { // Duplicate a card and return an object with the copies
        return [
            { id: this.createId(kana), content: kana, flipped: false },
            { id: this.createId(kana), content: kana, flipped: false }
        ];
    },

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    },

    checkGameOver() {
        let gameOver = true;
        this.cards.forEach((card) => {
            if (!card.flipped) {
                gameOver = false;
            }
        });
        return gameOver;
    },

    increaseMove() {
        this.moves++;
    },

}