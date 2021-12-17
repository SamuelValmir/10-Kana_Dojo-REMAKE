"use strict";

let gameStartScreenInterface = {
    htmlElement: document.querySelector(".game-start-screen"),
    firstShow: true,

    game: null,
    gameReference: null,
    mainColor: null,

    topElement: document.querySelector(".game-start-screen .top"),
    returnButton: document.querySelector(".game-start-screen .return-button"),
    returnButtonHighlight: document.querySelector(".game-start-screen .return-button-highlight"),

    hiraganaBestMatches: document.querySelector(".game-start-screen .result .hiragana-matches"),
    hiraganaBestMoves: document.querySelector(".game-start-screen .result .hiragana-moves"),
    katakanaBestMatches: document.querySelector(".game-start-screen .result .katakana-matches"),
    katakanaBestMoves: document.querySelector(".game-start-screen .result .katakana-moves"),
    bothBestMatches: document.querySelector(".game-start-screen .result .both-matches"),
    bothBestMoves: document.querySelector(".game-start-screen .result .both-moves"),

    settingsIcon: document.querySelector(".game-start-screen .settings-icon-container"),
    bottomElement: document.querySelector(".game-start-screen .bottom"),
    backgroundImageElement: document.querySelector(".game-start-screen .top img"),
    backgroundImage: null,
    titleElement: document.querySelector(".game-start-screen .bottom .game-title"),
    title: null,
    gameDescriptionElement: document.querySelector(".game-start-screen .bottom .game-description"),
    gameDescription: null,
    horizontalBarElement: document.querySelector(".game-start-screen .bottom hr"),
    buttonElement: document.querySelector(".game-start-screen .bottom .button"),

    checkBoxElementList: document.querySelectorAll(".game-start-screen .bottom .checkbox"),
    checkBoxObjectList: [],
    checkBoxHiragana: null,
    checkBoxKatakana: null,

    show(game, gameReference, mainColor, hslColorList, backgroundImage, gameTitle, gameDescription, buttonBoxShadowColor, gameConfigurationModal) {
        this.game = game;
        this.gameReference = gameReference;
        this.mainColor = mainColor
        this.hslColorList = hslColorList;
        this.backgroundImage = backgroundImage;
        this.title = gameTitle;
        this.gameDescription = gameDescription;
        this.buttonBoxShadowColor = buttonBoxShadowColor;
        this.gameConfigurationModal = gameConfigurationModal;

        this.htmlElement.style.display = "flex";
        this.topElement.lastElementChild.style.display = "flex";
        this.bottomElement.children[0].style.display = "flex";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";

        // It removes the event listeners of the game configuration modal
        this.gameConfigurationModal.dimensionElementList.forEach(dimensionElement => {
            dimensionElement.removeEventListener("click", this.gameConfigurationModal.dimensionClickEventListener);
        });

        this.gameConfigurationModal.switchElementList.forEach(switchElement => {
            switchElement.removeEventListener("click", this.gameConfigurationModal.switchClickEventListener);
        })

        this.gameConfigurationModal.resetButton.removeEventListener("click", this.gameConfigurationModal.resetButtonClickEventListener);
        this.gameConfigurationModal.doneButton.removeEventListener("click", this.gameConfigurationModal.doneButtonClickEventListener);

    },

    hideContent() {
        this.topElement.lastElementChild.style.display = "none";
        this.bottomElement.children[0].style.display = "none";
    },

    initialize() {
        // Build objects to the left and right checkboxes
        let isHiraganaChecked = null;
        let isKatakanaChecked = null;
        if (this.checkBoxHiragana !== null && this.checkBoxKatakana.isChecked !== null) {
            isHiraganaChecked = this.checkBoxHiragana.isChecked;
            isKatakanaChecked = this.checkBoxKatakana.isChecked;
        }
        this.checkBoxObjectList = new CheckBoxListController(this.checkBoxElementList, false, undefined, undefined, this.buttonElement, false, this.mainColor, [isHiraganaChecked, isKatakanaChecked]).build();
        this.checkBoxHiragana = this.checkBoxObjectList[0];
        this.checkBoxKatakana = this.checkBoxObjectList[1];

        if (this.firstShow === true) {
            this.firstShow = false;
            this.buttonElement.disabled = false;

            let gameStartScreenControllerObject = new GameStartScreenController(this.buttonElement, this.hslColorList);

            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, null)

            this.settingsIcon.addEventListener("click", async () => {
                await this.animateSettingsIcon();
                this.gameConfigurationModal.show(this.gameReference, this.mainColor, this.hslColorList);
            })

            this.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();

                const firstScreen = this;
                const secondScreen = menuScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);
                menuScreenInterface.show("right");
            })

            this.buttonElement.addEventListener("click", async () => {
                if (this.buttonElement.disabled === false && this.gameConfigurationModal.isShowing === false) {
                    await gameStartScreenControllerObject.animateButton();

                    const allKana = kana.getAll();
                    let cards = [];
                    if (this.checkBoxHiragana.isChecked === true) {
                        cards.push(kana.toHiragana(allKana));
                    }
                    if (this.checkBoxKatakana.isChecked === true) {
                        cards.push(kana.toKatakana(allKana));
                    }
                    cards = cards.flat();
                    cards = Cards.shuffle(cards);

                    this.hideContent();
                    this.game.show(cards, this.gameConfigurationModal.configuration, this.checkBoxObjectList);
                }
            })

            this.buttonElement.addEventListener("mouseover", async () => {
                if (this.buttonElement.disabled === false && this.gameConfigurationModal.isShowing === false) {
                    this.buttonElement.style.boxShadow = "0px 0px .5rem " + this.buttonBoxShadowColor;
                }
            })

            this.buttonElement.addEventListener("mouseout", async () => {
                this.buttonElement.style.boxShadow = "none";

            })
        }

        this.backgroundImageElement.src = this.backgroundImage;
        this.titleElement.innerHTML = this.title;
        this.titleElement.style.color = this.mainColor;

        this.gameDescriptionElement.innerHTML = this.gameDescription;
        this.horizontalBarElement.style.borderColor = this.mainColor;

        this.buttonElement.style.backgroundColor = this.mainColor;

        this.updateScore();
    },

    animateSettingsIcon() {
        const promise = new Promise(resolve => {

            let animation = this.settingsIcon.animate([
                { transform: "rotate(180deg)" }
            ], { duration: 300, easing: "ease-out" })

            animation.addEventListener("finish", () => {
                resolve();
            })
        })
        return promise;
    },

    updateScore() {
        let gameNameStorage;
        switch (this.title) {
            case EYE_SPY_GAME_TITLE: gameNameStorage = "eyeSpyData"; break;
            case MATCH_MAKER_GAME_TITLE: gameNameStorage = "matchMakerData"; break;
        }

        const storedGameData = JSON.parse(localStorage.getItem(gameNameStorage));
        const hiraganaBestMatches = storedGameData.hiragana.bestMatches;
        const hiraganaBestMoves = storedGameData.hiragana.bestMoves;
        const katakanaBestMatches = storedGameData.katakana.bestMatches;
        const katakanaBestMoves = storedGameData.katakana.bestMoves;
        const bothBestMatches = storedGameData.both.bestMatches;
        const bothBestMoves = storedGameData.both.bestMoves;

        this.hiraganaBestMatches.innerHTML = hiraganaBestMatches;
        this.hiraganaBestMoves.innerHTML = hiraganaBestMoves;
        this.katakanaBestMatches.innerHTML = katakanaBestMatches;
        this.katakanaBestMoves.innerHTML = katakanaBestMoves;
        this.bothBestMatches.innerHTML = bothBestMatches;
        this.bothBestMoves.innerHTML = bothBestMoves;
    }
}