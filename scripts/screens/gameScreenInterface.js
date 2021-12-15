"use strict";

class GameScreenInterface {
    constructor(returnButton, returnButtonHighlight) {
        this.returnButton = returnButton;
        this.returnButtonHighlight = returnButtonHighlight;
    }

    currentGameScreenInterface = null;
    mainColor = null;
    gameModel = null;

    gameConfigurationModal = null;
    checkBoxObjectList = null;

    kanaList = null;
    timeInterval = null;

    lastPromise = null;

    startGame() {
        this.initialize();
        this.lastPromise = null;
        this.gameModel.createCards();
        this.updateTime();
    }

    initialize() {
        this.returnButton.addEventListener("click", this.animateReturnButton);
    }

    updateTime() {
        let minutes = Math.floor(this.gameModel.time / 60);
        let seconds = this.gameModel.time % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        this.timeElement.innerHTML = minutes + ":" + seconds;
    }

    setVariables(kanaList, { dimensionX, dimensionY }, checkBoxObjectList) {
        this.htmlElement.style.display = "grid";
        this.timeInterval = null;
        this.kanaList = kanaList;
        this.dimension = dimensionX * dimensionY;
        this.boardElement.style.gridTemplateColumns = "auto ".repeat(dimensionX);
        this.boardElement.style.gridTemplateRows = "auto ".repeat(dimensionY);

        this.checkBoxObjectList = checkBoxObjectList;
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

    bonusTimeAnimation(){
        this.bonusTimeElement.style.display = "block";
        this.bonusTimeElement.innerHTML = "+" + this.gameConfigurationModal.configuration.bonusTime;
        this.bonusTimeElement.style.top = "0";
        
        const animation = this.bonusTimeElement.animate([
            {top: "-3rem"}
        ], {duration: 1000, easing: "ease"})
        animation.addEventListener("finish", ()=>{
            this.bonusTimeElement.style.display = "none";
        })
    }

    setMainColor([hue, saturation, lightness]) {
        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    }

    showGameOverScreen() {
        this.htmlElement.style.display = "none";
        gameOverScreenInterface.show(this, this.gameModel, this.checkBoxObjectList);
    }
}