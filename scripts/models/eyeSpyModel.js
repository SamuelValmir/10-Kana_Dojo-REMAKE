"use strict";

let eyeSpyModel = {
    cards: null,
    currentCards: [],
    sortedCard: null,

    moves: 0,
    index: 0,
    counter: 4,

    createCards(kanaList) { // It creates the objects cards and adds in currentCards only the ones that will appears on screen
        this.cards = [];

        for (const kana of kanaList) {
            this.cards.push(this.createCard(kana));
        }

        let index = this.index;
        let counter = this.counter;

        for (index; index < counter; index++) {
            this.currentCards.push(this.cards[index]);
        }
        this.currentCards = Cards.shuffle(this.currentCards);

        this.setSortedCard();
    },

    createCard(kana) { // Return an object with the object
        return {id: this.createId(kana), content: kana, flipped: false };
    },

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    },

    setSortedCard(){
        const randomPositionInCurrentCards = Math.floor(Math.random() * this.currentCards.length);
        this.sortedCard = this.currentCards[randomPositionInCurrentCards];
    },

    checkMatch(id) {
        let card = this.currentCards.filter((card) => card.id == id)[0];

        if(card === this.sortedCard){
            this.currentCards = this.currentCards.filter(element=> element != card);

            this.setSortedCard();
            return true;
        }
        return false;
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