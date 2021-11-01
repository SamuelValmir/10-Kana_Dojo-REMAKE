let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".eye-spy"),
    boardElement: document.querySelector(".eye-spy .board"),
    cards: undefined,

    showStartScreen(){
        gameStartScreenInterface.show(this, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
    },

    show(cards){
        this.htmlElement.style.display = "grid";
        this.cards = cards;
        new GameInterface(this);
    },
    
    hide(){
        this.htmlElement.style.display = "none";
    }
}