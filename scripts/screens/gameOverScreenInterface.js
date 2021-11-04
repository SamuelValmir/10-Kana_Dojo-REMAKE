let gameOverScreenInterface = {
    htmlElement: document.querySelector(".gameOver-screen"),
    playAgainButton: document.querySelector(".gameOver-screen .play-again"),
    menuButton: document.querySelector(".gameOver-screen .menu"),
    firstShow: true,
    game: null,

    show(){
        this.htmlElement.style.display = "flex";
        this.initialize();
    },

    hide(){
        this.htmlElement.style.display = "none";
    },
    initialize(){
        if (this.firstShow === true){
            this.firstShow = false;
            this.playAgainButton.addEventListener("click", ()=>{
                this.hide();
                gameStartScreenInterface.show();
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