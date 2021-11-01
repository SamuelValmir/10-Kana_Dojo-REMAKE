"use strict";

let matchMakerScreenInterface = {
    htmlElement: document.querySelector(".match-maker"),
    boardElement: document.querySelector(".match-maker .board"),
    cards: undefined,

    showStartScreen() {
        gameStartScreenInterface.show(this, MATCH_MAKER_MAIN_COLOR_LIST, MATCH_MAKER_MAIN_BACKGROUND_IMAGE, MATCH_MAKER_GAME_TITLE, MATCH_MAKER_GAME_DESCRIPTION);
    },

    show(cards) {
        this.htmlElement.style.display = "grid";
        this.cards = cards;
        new GameInterface(this, true);       
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

}
