class GameInterface {
    constructor(game, itHasCurrentIcon = false){
        this.game = game;
        this.itHasCurrentIcon = itHasCurrentIcon;
        this.startGame();
    }

    startGame() {
        if(this.itHasCurrentIcon === true){
            console.log("it has current icon")
        }
        
        matchMakerModel.createCards(this.game.cards);
        this.drawCardsOnScreen();
        this.setMoves();
    }

    drawCardsOnScreen() {
        // Making and adding the cards in html
        let boardElement = this.game.boardElement;

        matchMakerModel.currentCards.forEach(card => {
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.content = card.content;

            this.createCardBackFront(cardElement, card);

            cardElement.addEventListener('click', flipCard);
            boardElement.appendChild(cardElement);

            function flipCard() {
                if (matchMakerModel.setCard(this.id)) {
                    this.classList.add("flip");
                    matchMakerModel.increaseMove();
                    gameInterface.setMoves();
                    if (matchMakerModel.secondCard) {
                        if (matchMakerModel.checkMatch()) {
                            matchMakerModel.clearCards();
                            if (matchMakerModel.checkGameOver()) {
                                setTimeout(() => {
                                    let gameOverLayer = document.querySelector(".gameOver");
                                    gameOverLayer.style.display = "grid";
                                    setScore();
                                }, 1000)
                            }
                        } else {
                            setTimeout(() => {
                                let firstCardElement = document.getElementById(matchMakerModel.firstCard.id);
                                let secondCardElement = document.getElementById(matchMakerModel.secondCard.id);
        
                                matchMakerModel.unFlipCards();
                                firstCardElement.classList.remove("flip");
                                secondCardElement.classList.remove("flip");
                            }, 1000);
                        }
                    }
                }
            }
        });
    }

    createCardBackFront(cardElement, card) {
        let frontCardElement = document.createElement("div");
        frontCardElement.classList.add(CARD_FRONT);

        let backCardElement = document.createElement("div");
        backCardElement.classList.add(CARD_BACK);
        backCardElement.innerHTML = card.content;

        cardElement.appendChild(frontCardElement);
        cardElement.appendChild(backCardElement);
    }

    setMoves() {
        document.querySelector(".moves").innerHTML = matchMakerModel.moves;
    }

    setScore() {
        document.querySelector(".score").innerHTML = matchMakerModel.moves;
    }
}