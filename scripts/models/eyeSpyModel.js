"use strict";

let eyeSpyModel = {
    kanaList: null,
    cards: null,
    currentCards: [],
    sortedCard: null,
    inLastCard: false,

    isTimeLowing: false,
    time: 3,
    moves: 0,
    counter: 2,

    gameOver: false,

    createCards(kanaList, time) { // It creates the objects cards and adds in currentCards only the ones that will appears on screen
        this.kanaList = kanaList;
        this.time = time;
        this.cards = [];
        this.inLastCard = false;
        this.isTimeLowing = false;

        for (const kana of this.kanaList) {
            this.cards.push(this.createObjectFromCard(kana));
        }

        let counter = this.counter;

        this.cards = Cards.shuffle(this.cards);
        for (let index = 0; index < counter; index++) {
            this.currentCards.push(this.cards[index]);
        }

        this.currentCards = this.currentCards;

        this.setSortedCard();
    },

    createObjectFromCard(kana) { // Return an object with the object
        return { id: this.createId(kana), content: kana, flipped: false };
    },

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    },

    setTime() {
        const interval = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                clearInterval(interval);
                this.gameOver = true;
            }
        }, 1000);
    },

    setSortedCard() {
        const randomPositionInCurrentCards = Math.floor(Math.random() * this.currentCards.length);
        this.sortedCard = this.currentCards[randomPositionInCurrentCards].content;
    },

    checkMatch(id) {
        let card = this.currentCards.filter((card) => card.id == id)[0];

        if (card.content === this.sortedCard) {
            this.currentCards = this.currentCards.filter(element => element != card);

            if (this.currentCards.length !== 0) {
                this.setSortedCard();
            } else {
                this.inLastCard = true;
            }

            if (this.isTimeLowing === false) {
                this.isTimeLowing = true;
                this.setTime();
            }
            return true;
        }
        return false;
    },

    checkGameWin() {
        if (this.currentCards.length === 0) {
            return true;
        }
        return false;
    },

    increaseMove() {
        this.moves++;
    },

}