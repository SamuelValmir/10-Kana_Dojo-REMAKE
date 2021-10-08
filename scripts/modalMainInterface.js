let modalMainInterface = {
    htmlElement: document.querySelector(".modal-main"),
    checkBoxList: {
        leftCheckBoxList: document.querySelectorAll(".modal-main .modal-content-left .checkbox"),
        // hiragana: {
        //     htmlElement: document.querySelector(".modal-main .checkbox-hiragana"),
        // },
        // katakana:{
        //     htmlElement: document.querySelector(".modal-main .checkbox-katakana"),
        // }


        rightCheckBoxList: document.querySelector(".modal-main .modal-content-right"),
        // basic:{
        //     htmlElement: document.querySelector(".modal-main .checkbox-basic"),
        // },
        // voiced:{
        //     htmlElement: document.querySelector(".modal-main .checkbox-voiced"),
        // },
        // combo1:{
        //     htmlElement: document.querySelector(".modal-main .checkbox-combo1"),
        // },
        // combo2:{
        //     htmlElement: document.querySelector(".modal-main .checkbox-combo2"),
        // },

        animateCheckBoxAndCheckMarkCircle(checkBox, checkMarkCircle) {
            checkBox.animate([
                { transform: "scale(0.8)" }
            ], 200);

            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);
        },

        showCheckBoxAndCheckMark(checkBox, checkMark) {
            checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
            checkBox.style.borderColor = MENU_PRIMARY_COLOR;
            checkMark.style.display = "block"
        },

        hideCheckBoxAndCheckMark(checkBox, checkMark) {
            checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
            checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
            checkMark.style.display = "none"
        }
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

        // Build objects to the left and right checkboxes
        let leftCheckBoxElementList = this.checkBoxList.leftCheckBoxList;
        let rightCheckBoxElementList = this.checkBoxList.rightCheckBoxList;

        modalMain.checkBoxList.leftCheckBoxList = checkBoxList.built(leftCheckBoxElementList);
        modalMain.checkBoxList.rightCheckBoxList = checkBoxList.built(rightCheckBoxElementList);

        let checkBoxLeftObjectList = modalMain.checkBoxList.leftCheckBoxList;

        for (let index = 0; index < leftCheckBoxElementList.length; index++) {
            const checkBoxElement = leftCheckBoxElementList[index];
            const checkMarkElement = checkBoxElement.children[0];
            const checkMarkCircle = checkBoxElement.parentElement.children[0];
            const checkBoxObject = modalMain.checkBoxList.leftCheckBoxList[index];

            // console.log(checkBoxElement)
            //! Error when selecting the check box. It not animate some times
            checkBoxElement.addEventListener(("click"), () => {
                this.checkBoxList.animateCheckBoxAndCheckMarkCircle(checkBoxElement, checkMarkCircle);

                if (checkBoxList.canAnimate(checkBoxLeftObjectList, index) === true) {

                    if (checkBoxObject.isChecked === true) {
                        checkBoxObject.isChecked = false;
                        this.checkBoxList.hideCheckBoxAndCheckMark(leftCheckBoxElementList[index], checkMarkElement)
                    } else {
                        checkBoxObject.isChecked = true;
                        this.checkBoxList.showCheckBoxAndCheckMark(leftCheckBoxElementList[index], checkMarkElement)
                    }

                } else {
                    setTimeout(() => {
                        alert("At least one option must be selected!");
                    }, 300);
                }
            })

        }
    },
}