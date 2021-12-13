"use strict";

class QuizScreenModel {
    constructor(cards) {
        console.log(cards)
        this.cards = cards;
        this.currentCard = cards[0];
    }

    s = {'ふ': 'right', 'そ': 'wrong', 'も': 'wrong'};

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

    updateCurrentCard(){
        this.currentCard = this.cards[this.currentPosition - 1];
    }

    checkAnswer(answer){
        let result;
        let answerString = new String(answer);
        answerString = answerString.trim(); //remove the left and right whitespace
        answerString = answerString.toLowerCase();
        
        if (answerString === wanakana.toRomaji(this.currentCard)) {
            this.increaseRightCounter();
            result = true;
        } else{
            this.increaseWrongCounter();
            result = false;
        }

        this.increaseCurrentPosition();
        this.updateCurrentCard();

        if(this.currentPosition - 1 === this.cards.length){
            this.isOnLastCard = true;
        }
    
        return result;
    }
}