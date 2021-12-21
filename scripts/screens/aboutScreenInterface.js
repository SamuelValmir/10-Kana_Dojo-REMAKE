let aboutScreenInterface = {
    HTMLElement: document.querySelector(".about-screen"),
    firstShow: true,
    returnButton: document.querySelector(".about-screen .return-button"),
    returnButtonHighlight: document.querySelector(".about-screen .return-button-highlight"),
    replayTutorialButton: document.querySelector(".about-screen .tutorial-replay"),

    show() {
        this.HTMLElement.style.display = "block";
        this.initialize();
    },

    hide() {
        this.HTMLElement.style.display = "none";
    },

    initialize() {
        if (this.firstShow === true) {
            this.firstShow = false;

            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight);

            this.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();
                this.hide();
                menuScreenInterface.show();
            })

            this.replayTutorialButton.addEventListener("click", async () => {
                let animation = this.replayTutorialButton.animate([
                    { transform: "scale(.9)" },
                    { transform: "scale(.9)" },
                    { transform: "scale(1)" }
                ], { duration: 300, easing: "ease-out" })

                animation.addEventListener("finish", () => {
                    this.hide();
                    menuScreenInterface.show();
                    showTutorial();
                })
            })
        }
    }
}