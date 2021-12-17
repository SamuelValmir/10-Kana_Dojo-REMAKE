let gameOverScreenInterface = {
    htmlElement: document.querySelector(".gameOver-screen"),
    matchesNumberElement: document.querySelector(".gameOver-screen .matches"),
    movesNumberElement: document.querySelector(".gameOver-screen .moves-value"),
    playAgainButton: document.querySelector(".gameOver-screen .play-again"),
    menuButton: document.querySelector(".gameOver-screen .menu"),
    firstShow: true,

    game: null,
    gameModel: null,
    checkBoxObjectList: null,

    show(game, gameModel, checkBoxObjectList) {
        this.htmlElement.style.display = "flex";
        this.game = game;
        this.gameModel = gameModel;
        this.checkBoxObjectList = checkBoxObjectList;
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize() {
        this.matchesNumberElement.innerHTML = this.gameModel.matches;
        this.movesNumberElement.innerHTML = this.gameModel.moves;
        if (this.firstShow === true) {
            this.firstShow = false;
            this.playAgainButton.addEventListener("click", () => {
                this.hide();
                this.game.showStartScreen();
            })

            this.menuButton.addEventListener("click", () => {
                this.hide();
                gameStartScreenInterface.hide();
                menuScreenInterface.show();
            })
        }

        let gameNameStorage;

        switch (this.gameModel.gameName) {
            case EYE_SPY_GAME_TITLE: gameNameStorage = "eyeSpyData";
            case MATCH_MAKER_GAME_TITLE: gameNameStorage = "matchMakerData";
        }


        const storedGameData = JSON.parse(localStorage.getItem(gameNameStorage));
        const checkBoxHiragana = this.checkBoxObjectList[0];
        const checkBoxKatakana = this.checkBoxObjectList[1];
        let bestStored;
        let movesStored;

        if (checkBoxHiragana.isChecked === true && checkBoxKatakana.isChecked === true) {
            bestStored = storedGameData.both.bestMatches;
            movesStored = storedGameData.both.bestMoves;
            this.tryToStore(gameNameStorage, storedGameData, storedGameData.both);

        } else {
            if (checkBoxHiragana.isChecked === true) {
                bestStored = storedGameData.hiragana.bestMatches;
                movesStored = storedGameData.hiragana.bestMoves;
                this.tryToStore(gameNameStorage, storedGameData, storedGameData.hiragana);
            }

            if (checkBoxKatakana.isChecked === true) {
                bestStored = storedGameData.katakana.bestMatches;
                movesStored = storedGameData.katakana.bestMoves;
                this.tryToStore(gameNameStorage, storedGameData, storedGameData.katakana);
            }
        }
    },

    tryToStore(gameNameStorage, storedGameData, storedGameDataType) { // The stored game data type can be hiragana, katakana or both

        let updateData = false;
        if (this.gameModel.matches > storedGameDataType.bestMatches) {
            storedGameDataType.bestMatches = this.gameModel.matches;
            storedGameDataType.bestMoves = this.gameModel.moves;
            updateData = true;

        } else if (this.gameModel.matches === storedGameDataType.bestMatches & this.gameModel.moves < storedGameDataType.bestMoves) {
            storedGameDataType.bestMoves = this.gameModel.moves;
            updateData = true;
        }

        if (updateData === true) {
            storedGameData = JSON.stringify(storedGameData);
            localStorage.setItem(gameNameStorage, storedGameData);
        }
    }
}