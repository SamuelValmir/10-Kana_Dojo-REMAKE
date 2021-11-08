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
    time = 4;
    
    moves = 0;
    matches = 0;
    gameOver = false;

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    }
    
    checkMatch(){
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

        this.matches = 0;
    }

    checkGameWin() {
        if (this.currentCards.length === 0) {
            return true;
        }
        return false;
    }

    increaseMove() {
        this.moves++;
    }

}