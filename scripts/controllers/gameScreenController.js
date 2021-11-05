class GameScreenController {
    constructor(boardElement, dimension, gameModel) {
        this.boardElement = boardElement;
        dimension
        gameModel
        
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(this.dimension);

        this.gameModel.createCards(this.cards, this.time);
        this.lastPromise = null;
        this.timeElement.innerHTML = this.time;
        this.drawCardsOnScreen();
        this.setMoves();
    };


}