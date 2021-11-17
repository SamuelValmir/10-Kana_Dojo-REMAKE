"use strict";

class EyeSpyModel extends GameModel {
    constructor(kanaList, dimension) {
        super(kanaList, dimension);
    }

    sortedCard = null;

    createCards() { // It creates the objects cards
        this.cards = [];
        for (const kana of this.kanaList) {
            this.cards.push(this.createObjectFromCard(kana));
        }
         
        this.setCurrentCards();
        this.setSortedCard();
    }
    
    createObjectFromCard(kana) { // Return an object with the object
        return { id: this.createId(kana), content: kana, flipped: false, clickable: true };
    }

    setCurrentCards(){
        this.cards = Cards.shuffle(this.cards);
        super.setCurrentCards();
    }
    
    setSortedCard() {
        const randomPositionInCurrentCards = Math.floor(Math.random() * this.currentCards.length);
        this.sortedCard = this.currentCards[randomPositionInCurrentCards].content;
    }
    
    checkMatch(id) {
        let card = this.currentCards.filter((card) => card.id === id)[0];

        if (card.content === this.sortedCard) {
            this.trySetTime();
            this.matches++;
            this.currentCards = this.currentCards.filter(element => element != card); // Removes the card matched from currentCards

            if (this.currentCards.length !== 0) {
                this.setSortedCard();
            } else {
                this.inLastCard = true;
            }
            return true;
        }
        return false;
    }

    checkGameWin() {
        if (this.currentCards.length === 0) {
            return true;
        }
        return false;
    }

}