class EyeSpyModel extends GameModel {
    constructor(kanaList) {
        super(kanaList, 1.3);
        // this.createCards();
    }

    sortedCard = null;
    inLastCard = false;

    createCards() { // It creates the objects cards
        for (const kana of this.kanaList) {
            this.cards.push(this.createObjectFromCard(kana));
        }

        this.setCurrentCards();
        this.setSortedCard();
    }

    createObjectFromCard(kana) { // Return an object with the object
        return { id: this.createId(kana), content: kana, flipped: false, clickable: true };
    }

    setCurrentCards() { // It adds in currentCards only the cards that will appear on screen
        this.cards = Cards.shuffle(this.cards);
        for (let index = 0; index < (this.dimension ** 2); index++) {
            this.currentCards.push(this.cards[index]);
        }
    }

    setSortedCard() {
        const randomPositionInCurrentCards = Math.floor(Math.random() * this.currentCards.length);
        this.sortedCard = this.currentCards[randomPositionInCurrentCards].content;
    }

    checkMatch(id) {
        let card = this.currentCards.filter((card) => card.id === id)[0];
        
        if (card.content === this.sortedCard) {
            super.checkMatch();
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

}