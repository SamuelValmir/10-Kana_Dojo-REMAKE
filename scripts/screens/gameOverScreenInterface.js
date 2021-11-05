let gameOverScreenInterface = {
    htmlElement: document.querySelector(".gameOver-screen"),
    matchesNumberElement: document.querySelector(".gameOver-screen .matches"),
    playAgainButton: document.querySelector(".gameOver-screen .play-again"),
    menuButton: document.querySelector(".gameOver-screen .menu"),
    firstShow: true,

    game: null,
    matches:null,

    show(game, matches){
        this.htmlElement.style.display = "flex";
        this.game = game;
        this.matches = matches;
        this.initialize();
    },

    hide(){
        this.htmlElement.style.display = "none";
    },

    initialize(){
        this.matchesNumberElement.innerHTML = this.matches;
        if (this.firstShow === true){
            this.firstShow = false;
            this.playAgainButton.addEventListener("click", ()=>{
                this.hide();
                this.game.showStartScreen();
            })

            this.menuButton.addEventListener("click", ()=>{
                this.hide();
                gameStartScreenInterface.hide();
                menuScreenInterface.show();
            })
        }
    }
}