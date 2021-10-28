let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".d"),

    showStartScreen(){
        gameStartScreenInterface.show(gameStartScreenInterface, EYE_SPY_MAIN_COLOR, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
    },

    show(){
        this.htmlElement.style.display = "flex";
        this.initialize();
    },
    
    hide(){
        this.htmlElement.style.display = "none";
    },

    initialize(){
        console.log("content")
    }
}