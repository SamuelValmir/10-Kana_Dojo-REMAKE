let modalMain = {
    htmlElement: document.querySelector(".modal-main"),
    checkBoxList: {
        leftCheckBoxList: {
            htmlElement: document.querySelector(".modal-main .modal-content-left"),
            hiragana: {
                htmlElement: document.querySelector(".modal-main .checkbox-hiragana"),
                isChecked: true,
            },
            katakana:{
                htmlElement: document.querySelector(".modal-main .checkbox-katakana"),
                isChecked: false,
            }
        },

        rightCheckBoxList: {
            htmlElement: document.querySelector(".modal-main .modal-content-right"),
            basic:{
                htmlElement: document.querySelector(".modal-main .checkbox-basic"),
                isChecked: true,
            },
            voiced:{
                htmlElement: document.querySelector(".modal-main .checkbox-voiced"),
                isChecked: false,
            },
            combo1:{
                htmlElement: document.querySelector(".modal-main .checkbox-combo1"),
                isChecked: false,
            },
            combo2:{
                htmlElement: document.querySelector(".modal-main .checkbox-combo2"),
                isChecked: false,
            },
        },
        
        animate(checkBox){

        },

        check(checkBox){
            checkBox.isChecked = true;
            //* Make it red
        },
    },

    buttons: {
        backButton: {
            htmlElement: document.querySelector(".modal-main-button-back"),
        },
        startButton: {
            htmlElement: document.querySelector(".modal-main-button-start"),
        },

        animate(button) {
            let promise = new Promise((resolve) => {
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

        // Set the left and right checkboxes
        let leftCheckBoxList = this.checkBoxList.leftCheckBoxList;
        console.log(leftCheckBoxList.htmlElement)
        for(let i = 0; i < leftCheckBoxList.htmlElement.children.length; i++){
            let checkBox = leftCheckBoxList.htmlElement.children[i];
        }

    },

    reset() {
    }
}