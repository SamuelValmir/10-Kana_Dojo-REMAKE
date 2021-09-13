let game = {
    cards: null,

    createCards: function () {
        this.cards = [];

        // It puts each element/kana from kanaJson to cards array
        for (const family of Object.values(kanaJson)) {
            for (const kana of family) {
                this.cards.push(this.createPairOf(kana));
            }
        }

        // It makes a list with only elements, without objects
        this.cards = this.cards.flatMap(pair => pair);
        for (let index = 0; index < 62; index++) {
            this.cards.pop();
        }
        this.shuffle();
    },

    createPairOf: function (kana) { // Duplicate a card and return an object with the copies
        return [
            { id: this.createId(kana), content: wanakana.toHiragana(kana), flipped: false },
            { id: this.createId(kana), content: wanakana.toHiragana(kana), flipped: false }
        ];
    },

    shuffle: function () {
        let cards = this.cards;
        let currentIndex = cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
        }
    },

    createId: function (kana) {
        let num = Math.random() * 1000
        return kana + parseInt(num);
    }

}