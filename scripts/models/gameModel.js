"use strict";

class GameModel {
    constructor(kanaList, gameConfiguration) {
        this.kanaList = kanaList;
        this.gameConfiguration = gameConfiguration;
        this.time = gameConfiguration.time;
        this.dimension = Math.floor((gameConfiguration.dimensionX * gameConfiguration.dimensionY));
    }

    cards = [];
    currentCards = [];

    isTimeLowing = false;
    inLastCard = false;
    
    moves = 0;
    matches = 0;
    gameOver = false;

    setCurrentCards() { // It adds in currentCards only the cards that will appear on screen
        for (let index = 0; index < (this.dimension); index++) {
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

    checkGameOver() {
        if (this.gameOver === true) {
            return true;
        }
        return false;
    }

    increaseMove() {
        this.moves++;
    }

    increaseTime(){
        const {bonusTime} = this.gameConfiguration;
        this.time += bonusTime;
    }

}