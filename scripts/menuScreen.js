"use strict";
let menuScreen = {
    htmlElement: document.querySelector(".menu-screen"),
    show() {
        this.htmlElement.style.display = "block";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.reset();
    },

    initialize() {

    },

    reset() {

    }
}
