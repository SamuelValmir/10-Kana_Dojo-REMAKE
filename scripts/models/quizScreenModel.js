"use strict";

class QuizScreenModel {
    constructor(cards) {
        this.cards = cards;
        this.currentCard = cards[0];

        this.answers = {};
    }

    wrongCounter = 0;
    rightCounter = 0;
    currentPosition = 1;
    animationIsShowing = false;
    isOnLastCard = false;

    increaseWrongCounter() {
        this.wrongCounter++;
    }

    increaseRightCounter() {
        this.rightCounter++;
    }

    increaseCurrentPosition() {
        this.currentPosition++;
    }

    updateCurrentCard() {
        this.currentCard = this.cards[this.currentPosition - 1];
    }

    checkAnswer(answer) {
        let result;
        let answerString = new String(answer);
        answerString = answerString.trim(); //remove the left and right whitespace
        answerString = answerString.toLowerCase();

        if (answerString === wanakana.toRomaji(this.currentCard)) {
            this.increaseRightCounter();
            this.answers[this.currentCard] = "right";
            result = true;
        } else {
            this.increaseWrongCounter();
            this.answers[this.currentCard] = "wrong";
            result = false;
        }

        this.increaseCurrentPosition();
        this.updateCurrentCard();

        if (this.currentPosition - 1 === this.cards.length) {
            this.isOnLastCard = true;
        }

        return result;
    }

    saveAnswers() {
        // It parses the object into a array list
        const answersList = Object.entries(this.answers);

        const statsDataStored = JSON.parse(localStorage.getItem("statsData"));
        const hiraganaValues = Object.values(statsDataStored.hiragana)[0];
        const katakanaValues = Object.values(statsDataStored.katakana)[0];

        // It separates who is hiragana from who is katakana then it changes the answers of the statsDataStored
        for (let answer of answersList) {
            let kana = answer[0];
            let result = answer[1];

            if (wanakana.isHiragana(kana) === true) {
                hiraganaValues[kana][result] += 1;
                this.calculateAccuracy(hiraganaValues[kana]);

            } else if (wanakana.isKatakana(kana) === true) {
                katakanaValues[kana][result] += 1;
                this.calculateAccuracy(katakanaValues[kana]);
            }
        }

        // It changes the variable in the local storage with the updated value 
        const statsDataString = JSON.stringify(statsDataStored);
        localStorage.setItem("statsData", statsDataString);
    }

    
    calculateAccuracy(answer) {
        if(answer.right !== 0){
            const percentage = (answer.right - answer.wrong) * 100 / answer.right;
            const roundedPercentage = Math.round(percentage);
            answer.accuracy = roundedPercentage;
        } else{
            answer.accuracy = 0;
        }
    }
}