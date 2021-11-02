"use strict";

let eyeSpyModel = {
    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,
    moves: 0,
    index: 0,
    counter: 25,

    currentCards: [],
    sortedCard: null,

    createCards(kanaList) { // It creates the objects cards and adds in currentCards only the ones that will appears on screen
        this.cards = [];

        for (const kana of kanaList) {
            this.cards.push(this.createCard(kana));
        }
        console.log(this.cards)

        let index = this.index;
        let counter = this.counter;

        for (index; index < counter; index++) {
            this.currentCards.push(this.cards[index]);
        }
        this.currentCards = Cards.shuffle(this.currentCards);
    },

    createCard(kana) { // Return an object with the object
        return {content: kana, flipped: false };
    },
    
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