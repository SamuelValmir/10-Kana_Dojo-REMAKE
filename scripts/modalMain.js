let modalMain = {
    htmlElement: document.querySelector(".modal-main"),
    buttons: {
        backButton: {
            htmlElement: document.querySelector(".modal-main-button-back"),
        },
        startButton: {
            htmlElement: document.querySelector(".modal-main-button-start"),
            animate() {

            }
        },

        animate(button) {
            let promise = new Promise((resolve)=>{
                let animation = button.htmlElement.animate([
                    { backgroundColor: "#ddd" },
                    { backgroundColor: "var(--white)" },
                ], 300);
    
                // When animation is finished the button execute it function
                animation.addEventListener('finish', () => {
                    resolve();
                })
            })
            return promise;
        }
    },

    show() {
        this.htmlElement.style.display = "flex";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.reset();
    },

    initialize() {
        let backButton = this.buttons.backButton;
        let startButton = this.buttons.startButton;

        backButton.htmlElement.addEventListener("click", async () => {
            await this.buttons.animate(backButton);
            this.hide();
        })

        startButton.htmlElement.addEventListener("click", async () => {
            await this.buttons.animate(startButton);
            this.hide();
            menuScreen.hide();
            flashCardScreen.show();
        })

    },

    reset() {

    }
}