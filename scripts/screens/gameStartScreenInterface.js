"use strict";

let gameStartScreenInterface = {
    htmlElement: document.querySelector(".game-start-screen"),
    firstShow: true,

    game: undefined,
    mainColor: undefined,

    backgroundImage: undefined,
    titleElement: document.querySelector(".game-start-screen .bottom .game-title"),
    title: undefined,
    gameDescriptionElement: document.querySelector(".game-start-screen .bottom .game-description"),
    gameDescription: undefined,
    horizontalBarElement: document.querySelector(".game-start-screen .bottom hr"),
    buttonElement: document.querySelector(".game-start-screen .bottom .button"),

    checkBoxElementList: document.querySelectorAll(".game-start-screen .bottom .checkbox"),
    checkBoxObjectList: [],
    show(game, mainColor, gameTitle, gameDescription) {

        this.game = game;
        this.mainColor = mainColor;
        this.title = gameTitle;
        this.gameDescription = gameDescription;

        this.htmlElement.style.display = "flex";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize() {
        if (this.firstShow === true) {
            this.firstShow = false;

            // Build objects to the left and right checkboxes
            let checkBoxElementList = this.checkBoxElementList;

            this.checkBoxObjectList = checkBoxList.built(checkBoxElementList, false, undefined, undefined, this.buttonElement);
            console.log(this.checkBoxElementList)
        } else {
            checkBoxList.reset(this.leftCheckBoxObjectList);
            checkBoxList.reset(this.rightCheckBoxObjectList);
        }

        this.titleElement.innerHTML = this.title;
        this.titleElement.style.color = this.mainColor;

        this.gameDescriptionElement.innerHTML = this.gameDescription;
        this.horizontalBarElement.style.borderColor = this.mainColor;

        this.buttonElement.style.backgroundColor = this.mainColor;
    }
}