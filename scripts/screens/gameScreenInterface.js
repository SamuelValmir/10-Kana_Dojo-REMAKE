"use strict";

class GameScreenInterface {
    constructor(returnButton, returnButtonHighlight) {
        // this.gameScreenInterfaceReference = gameScreenInterfaceReference;
        this.returnButton = returnButton;
        this.returnButtonHighlight = returnButtonHighlight;
    }

    currentGameScreenInterface = null;
    mainColor = null;
    gameModel = null;

    gameConfigurationModal = null;
    
    kanaList = null;
    timeInterval = null;

    lastPromise = null;

    startGame() {
        this.initialize();
        this.lastPromise = null;
        this.gameModel.createCards();
        this.updateTime();
    }

    initialize(){
        this.returnButton.addEventListener("click", this.animateReturnButton);
    }

    updateTime(){
        let minutes = Math.floor(this.gameModel.time / 60);
        let seconds = this.gameModel.time % 60;
        
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        this.timeElement.innerHTML = minutes + ":" + seconds;
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
        this.returnButton.removeEventListener("click", this.animateReturnButton);
        clearInterval(this.currentGameScreenInterface.timeInterval);
    }

    animateReturnButton = async () => {
        const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, null)
        await HeaderControllerObject.animateButton();
        this.hide();
        this.currentGameScreenInterface.showStartScreen();
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