"use strict";

let gameStartScreenInterface = {
    htmlElement: document.querySelector(".game-start-screen"),
    firstShow: true,

    game: undefined,
    mainColor: undefined,

    backgroundImageElement: document.querySelector(".game-start-screen .top img"),
    backgroundImage: undefined,
    titleElement: document.querySelector(".game-start-screen .bottom .game-title"),
    title: undefined,
    gameDescriptionElement: document.querySelector(".game-start-screen .bottom .game-description"),
    gameDescription: undefined,
    horizontalBarElement: document.querySelector(".game-start-screen .bottom hr"),
    buttonElement: document.querySelector(".game-start-screen .bottom .button"),

    checkBoxElementList: document.querySelectorAll(".game-start-screen .bottom .checkbox"),
    checkBoxObjectList: [],

    show(game, hslColorList, backgroundImage, gameTitle, gameDescription) {
        this.game = game;
        this.hslColorList = hslColorList;
        const [hue, saturation, lightness] = this.hslColorList;

        this.mainColor = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
        this.backgroundImage = backgroundImage;
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
            this.buttonElement.disabled = false;

            // Build objects to the left and right checkboxes
            let checkBoxElementList = this.checkBoxElementList;
            this.checkBoxObjectList = new CheckBoxListController(checkBoxElementList, false, undefined, undefined, this.buttonElement, false, this.mainColor).build();
            let gameStartScreenControllerObject = new GameStartScreenController(this.buttonElement, this.hslColorList);

            this.buttonElement.addEventListener("click", async () => {
                if (this.buttonElement.disabled === false) {
                    await gameStartScreenControllerObject.animateButton();
                    this.hide();
                    this.game.show();
                }
            })

        } else {
            checkBoxList.reset(this.leftCheckBoxObjectList);
            checkBoxList.reset(this.rightCheckBoxObjectList);
        }

        this.backgroundImageElement.src = this.backgroundImage;
        this.titleElement.innerHTML = this.title;
        this.titleElement.style.color = this.mainColor;

        this.gameDescriptionElement.innerHTML = this.gameDescription;
        this.horizontalBarElement.style.borderColor = this.mainColor;

        this.buttonElement.style.backgroundColor = this.mainColor;
    }
}