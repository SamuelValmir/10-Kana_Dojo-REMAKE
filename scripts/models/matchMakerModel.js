"use strict";

class MatchMakerModel extends GameModel {
    constructor(kanaList, dimension) {
        super(kanaList, dimension);
    }

    lockMode = false;
    firstCard = null;
    secondCard = null;
    index = 0;

    createCards() {
        this.cards = [];
        for (const kana of this.kanaList) {
            this.cards.push(this.createPairOf(kana));
        }

        // It makes a list with only elements, without objects
        this.cards = this.cards.flat()

        // this.cards = this.cards.flatMap(pair => pair);


        this.setCurrentCards();
    }

    setCurrentCards() {
        super.setCurrentCards()
        console.log(this.currentCards)
        this.currentCards = Cards.shuffle(this.currentCards);
        console.log(this.currentCards)
    }

    createPairOf(kana) { // Duplicate a card and return an object with the copies
        return [
            { id: this.createId(kana), content: kana, flipped: false },
            { id: this.createId(kana), content: kana, flipped: false }
        ];
    }


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
    }

    checkMatch() {
        this.trySetTime();
        if (this.firstCard && this.secondCard) {
            let match = this.firstCard.content === this.secondCard.content;

            if (match === true) {
                this.matches++;
            }
            
            return match;
        }
        return false;
    }

    clearCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    }

    unFlipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    }



    checkGameOver() {
        let gameOver = true;
        this.cards.forEach((card) => {
            if (!card.flipped) {
                gameOver = false;
            }
        });
        return gameOver;
    }

    increaseMove() {
        this.moves++;
    }

}