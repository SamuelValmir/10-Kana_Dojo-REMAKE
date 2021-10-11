let modalMainInterface = {
    htmlElement: document.querySelector(".modal-main"),
    checkBoxList: {
        leftCheckBoxList: document.querySelectorAll(".modal-main .modal-content-left .checkbox"),
        rightCheckBoxList: document.querySelectorAll(".modal-main .modal-content-right .checkbox"),
    },

    buttons: {
        backButton: document.querySelector(".modal-main-button-back"),
        startButton: document.querySelector(".modal-main-button-start"),

        animate(button) {
            let promise = new Promise((resolve) => {
                let animation = button.animate([
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
        this.initializeButtons();

        // Build objects to the left and right checkboxes
        let leftCheckBoxElementList = this.checkBoxList.leftCheckBoxList;
        let rightCheckBoxElementList = this.checkBoxList.rightCheckBoxList;

        modalMain.leftCheckBoxList = checkBoxList.built(leftCheckBoxElementList);
        modalMain.rightCheckBoxList = checkBoxList.built(rightCheckBoxElementList, true);

        let checkBoxLeftObjectList = modalMain.leftCheckBoxList;
        let checkBoxRightObjectList = modalMain.rightCheckBoxList;

        checkBoxList.initializeCheckboxList(checkBoxLeftObjectList);
        checkBoxList.initializeCheckboxList(checkBoxRightObjectList);
    },

    initializeButtons() {
        let backButton = this.buttons.backButton;
        let startButton = this.buttons.startButton;

        backButton.addEventListener("click", async () => {
            await this.buttons.animate(backButton);
            this.hide();
        })

        startButton.addEventListener("click", async () => {
            await this.buttons.animate(startButton);


            let checkBoxHiragana = modalMain.leftCheckBoxList[0];
            let checkBoxKatakana = modalMain.leftCheckBoxList[1];

            let checkboxBasic = modalMain.rightCheckBoxList[0];
            let checkboxVoiced = modalMain.rightCheckBoxList[1];
            let checkboxCombo1 = modalMain.rightCheckBoxList[2];
            let checkboxCombo2 = modalMain.rightCheckBoxList[3];

            if (checkBoxHiragana.isChecked === true) {  // If checkbox hiragana is checked...
                if (checkboxBasic.IsChecked === true) {
                    if (checkboxBasic.dataset.edited === "false") {
                        hiraganaBasicCheckboxCheckedList = [...kana.basic].map((kana) => wanakana.toHiragana(kana));
                    }
                }

                if (checkboxVoiced.isChecked === true) {
                    if (checkboxVoiced.dataset.edited === "false") {
                        hiraganaVoicedCheckboxCheckedList = [...kana.voiced].map((kana) => wanakana.toHiragana(kana));
                    }
                }

                if (checkboxCombo1.isChecked === true) {
                    if (checkboxCombo1.dataset.edited === "false") {
                        hiraganaCombo1CheckboxCheckedList = [...kana.combo1].map((kana) => wanakana.toHiragana(kana));
                    }
                }

                if (checkboxCombo2.isChecked === true) {
                    if (checkboxCombo2.dataset.edited === "false") {
                        hiraganaCombo2CheckboxCheckedList = [...kana.combo2].map((kana) => wanakana.toHiragana(kana));
                    }
                }


            }
            if (checkBoxKatakana.IsChecked === true) { // If checkbox hiragana is not checked...
                if (checkboxBasic.IsChecked === true) {
                    if (checkboxBasic.dataset.edited === "false") {
                        katakanaBasicCheckboxCheckedList = [...kana.basic].map((kana) => wanakana.toKatakana(kana));
                    }
                }

                if (checkboxVoiced.IsChecked === true) {
                    if (checkboxVoiced.dataset.edited === "false") {
                        katakanaVoicedCheckboxCheckedList = [...kana.voiced].map((kana) => wanakana.toKatakana(kana));
                    }
                }

                if (checkboxCombo1.IsChecked === true) {
                    if (checkboxCombo1.dataset.edited === "false") {
                        katakanaCombo1CheckboxCheckedList = [...kana.combo1].map((kana) => wanakana.toKatakana(kana));
                    }
                }

                if (checkboxCombo2.IsChecked === true) {
                    if (checkboxCombo2.dataset.edited === "false") {
                        katakanaCombo2CheckboxCheckedList = [...kana.combo2].map((kana) => wanakana.toKatakana(kana));
                    }
                }
            }

            let cardsForFlashCards = [
                [...hiraganaBasicCheckboxCheckedList],
                [...hiraganaVoicedCheckboxCheckedList],
                [...hiraganaCombo1CheckboxCheckedList],
                [...hiraganaCombo2CheckboxCheckedList],
                [...katakanaBasicCheckboxCheckedList],
                [...katakanaVoicedCheckboxCheckedList],
                [...katakanaCombo1CheckboxCheckedList],
                [...katakanaCombo2CheckboxCheckedList]]

            this.hide();
            menuScreen.hide();
            flashCardScreen.show(cardsForFlashCards);
        })
    },

    checkBoxClickEventListener(checkBoxObject, checkBoxObjectList, index) {
        checkBoxObject.animateCheckBoxAndCheckMarkCircle();

        if (checkBoxList.canAnimate(checkBoxObjectList, index) === true) {

            if (checkBoxObject.isChecked === true) {
                checkBoxObject.isChecked = false;
                checkBoxObject.hideCheckBoxAndCheckMark();
                checkBoxObject.hideEditIcon();
            } else {
                checkBoxObject.isChecked = true;
                checkBoxObject.showCheckBoxAndCheckMark();
                checkBoxObject.showEditIcon();
            }

        } else {
            setTimeout(() => {
                alert("At least one option must be selected!");
            }, 300);
        }
    },

    async editIconClickEventListener(checkBoxObject) {
        await checkBoxObject.animateEditIcon();
        let title = checkBoxObject.name;
        modalCustom.show(title, checkBoxObject);
    }
}