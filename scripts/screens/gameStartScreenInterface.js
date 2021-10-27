"use strict";

let gameStartScreenInterface = {
    htmlElement: document.querySelector(".game-start-screen"),
    firstShow: true,
    mainColor: undefined,
    backgroundImage: undefined,

    show(){
        this.htmlElement.style.display = "flex";
        this.initialize();
    },
    
    hide(){
        this.htmlElement.style.display = "none";
    },

    initialize(){
        if(this.firstShow === true){
            this.firstShow = false;
        }
    }
}