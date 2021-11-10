"use strict";

class GameModel {
    constructor(kanaList, dimension) {
        this.kanaList = kanaList;
        // this.time = time;
        this.dimension = dimension;
    }

    cards = [];
    currentCards = [];

    isTimeLowing = false;
    time = 5;

    moves = 0;
    matches = 0;
    gameOver = false;

    setCurrentCards() { // It adds in currentCards only the cards that will appear on screen
        for (let index = 0; index < (this.dimension ** 2); index++) {
            this.currentCards.push(this.cards[index]);
        }
    }

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    }

    trySetTime() {
        if (this.isTimeLowing === false) {
            this.isTimeLowing = true;
            this.setTime();
        }
    }

    setTime() {
        const interval = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                clearInterval(interval);
                this.gameOver = true;
            }
        }, 1000);
    }

    reset() {
        this.cards = [];
        this.currentCards = [];

        this.time = 2;
        this.moves = 0;
        this.dimension = 2;

        this.firstGame = true;
        this.matches = 0;
    }

    checkGameOver() {
        if (this.gameOver === true) {
            return true;
        }
        return false;
    }

    increaseMove() {
        this.moves++;
    }

}