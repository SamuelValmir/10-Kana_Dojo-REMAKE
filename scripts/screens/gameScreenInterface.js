"use strict";

class GameScreenInterface {
    constructor(gameScreenInterfaceReference, returnButton, returnButtonHighlight) {
        this.gameScreenInterfaceReference = gameScreenInterfaceReference;
        this.returnButton = returnButton;
        this.returnButtonHighlight = returnButtonHighlight;
        returnButton.addEventListener("click", this.animateReturnButton);
    }

    currentGameScreenInterface = null;
    mainColor = null;
    gameModel = null;
    kanaList = null;
    time = null;
    timeInterval = null;

    lastPromise = null;

    startGame() {
        this.lastPromise = null;
        this.gameModel.createCards();
        this.time = this.gameModel.time;
        console.log(this.gameModel)
        this.timeElement.innerHTML = this.time;
    }

    setVariables(kanaList, {dimensionX, dimensionY}) {
        this.htmlElement.style.display = "grid";
        this.kanaList = kanaList;
        this.dimension = dimensionX * dimensionY;
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(dimensionX);
        this.boardElement.style.gridTemplateRows = "auto ".repeat(dimensionY);
    }

    hide() {
        this.htmlElement.style.display = "none";
    }

    animateReturnButton = async () => {
        const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, null)
        await HeaderControllerObject.animateButton();
        this.returnButton.removeEventListener("click", this.animateReturnButton);
        this.hide();
        clearInterval(this.currentGameScreenInterface.timeInterval)
        new this.gameScreenInterfaceReference().showStartScreen();
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

    setMoves(movesElement) {
        movesElement.innerHTML = this.gameModel.moves;
    }

    setScore() {
        document.querySelector(".score").innerHTML = this.gameModel.moves;
    }

    setMainColor([hue, saturation, lightness]) {
        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    }

    showGameOverScreen() {
        this.htmlElement.style.display = "none";
        gameOverScreenInterface.show(this, this.gameModel.matches);
    }
}