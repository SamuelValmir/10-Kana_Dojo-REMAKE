let game = {
    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,
    moves: 0,

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
    },

    checkMatch() {
        if (this.firstCard && this.secondCard) {
            return this.firstCard.content === this.secondCard.content;
        }
        return false;
    },

    clearCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unFlipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    createCards() {
        this.cards = [];

        // It puts each element/kana from kanaJson to cards array
        for (const family of Object.values(kanaJson.basic)) {
            for (const kana of family) {
                this.cards.push(this.createPairOf(kana));
            }
        }

        // It makes a list with only elements, without objects
        this.cards = this.cards.flatMap(pair => pair);
        for (let index = 0; index < 90; index++) {
            this.cards.pop();
        }
        this.shuffle();
    },

    createPairOf(kana) { // Duplicate a card and return an object with the copies
        return [
            { id: this.createId(kana), content: wanakana.toHiragana(kana), flipped: false },
            { id: this.createId(kana), content: wanakana.toHiragana(kana), flipped: false }
        ];
    },

    shuffle() {
        let cards = this.cards;
        let currentIndex = cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
        }
    },

    createId(kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    },

    checkGameOver(){
        let gameOver = true;
        this.cards.forEach((card) => {
            if(!card.flipped){
                gameOver = false;
            }
        });
        return gameOver;
    },

    increaseMove(){
        this.moves++;
    },

}