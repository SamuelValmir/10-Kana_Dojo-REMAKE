class QuizScreenModel {
    constructor(cards) {
        this.cards = cards;
        this.currentCard = cards[0];
    }
    wrongCounter = 0;
    rightCounter = 0;
    currentPosition = 1;

    increaseWrongCounter() {
        this.wrongCounter++;
    }

    increaseRightCounter() {
        this.rightCounter++;
    }

    increaseCurrentPosition() {
        this.currentPosition++;
    }
    
    updateCardsCounter() {

    }

    updateCurrentCard(){
        this.currentCard = this.cards[this.currentPosition - 1];
    }

    checkAnswer(answer){
        let result;
        let answerString = new String(answer);
        answerString = answerString.trim();

        if (answerString === wanakana.toRomaji(this.currentCard)) {
            this.increaseRightCounter();
            result = true;
        } else{
            this.increaseWrongCounter();
            result = false;
        }
        
        this.increaseCurrentPosition();
        this.updateCurrentCard();
        return result;
    }
}