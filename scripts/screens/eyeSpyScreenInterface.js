let eyeSpyScreenInterface = {
    htmlElement: document.querySelector(".d"),

    showStartScreen(){
        gameStartScreenInterface.show(this, EYE_SPY_MAIN_COLOR_LIST, EYE_SPY_MAIN_BACKGROUND_IMAGE, EYE_SPY_GAME_TITLE, EYE_SPY_GAME_DESCRIPTION);
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