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

        // It saves the score
        const checkBoxHiragana = this.checkBoxObjectList[0];
        const checkBoxKatakana = this.checkBoxObjectList[1];


        let gameNameStorage;
        if (this.gameModel.gameName === EYE_SPY_GAME_TITLE) {
            gameNameStorage = "eyeSpyData";

        } else if (this.gameModel.gameName === MATCH_MAKER_GAME_TITLE) {
            gameNameStorage = "matchMakerData";
        }

        const storedGameData = JSON.parse(localStorage.getItem(gameNameStorage));
        console.log(storedGameData);

        const best;
        const moves;

        if (checkBoxHiragana.isChecked === true && checkBoxKatakana.isChecked === true) {
            best = storedGameData.both.best;
            moves = storedGameData.both.moves;
            console.log(best)
            console.log(moves)
        } else {
            if (checkBoxHiragana.isChecked === true) {
                best = storedGameData.hiragana.best;
                moves = storedGameData.hiragana.moves;
                console.log(best)
                console.log(moves)
            }

            if (checkBoxKatakana.isChecked === true) {
                best = storedGameData.katakana.best;
                moves = storedGameData.katakana.moves;
                console.log(best)
                console.log(moves)

            }
        }

        if (best > this.gameModel.matches && moves < this.gameModel.moves) {
            // Update data from local storage
        }
    }
}