"use strict";

let modalMainInterface = {
    htmlElement: document.querySelector(".modal-main"),
    leftCheckBoxElementList: document.querySelectorAll(".modal-main .modal-content-left .checkbox"),
    rightCheckBoxElementList: document.querySelectorAll(".modal-main .modal-content-right .checkbox"),
    leftCheckBoxObjectList: [],
    rightCheckBoxObjectList: [],

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
        let leftCheckBoxElementList = this.leftCheckBoxElementList;
        let rightCheckBoxElementList = this.rightCheckBoxElementList;

        this.leftCheckBoxObjectList = checkBoxList.built(leftCheckBoxElementList);
        this.rightCheckBoxObjectList = checkBoxList.built(rightCheckBoxElementList, true);

        let checkBoxLeftObjectList = this.leftCheckBoxObjectList;
        let checkBoxRightObjectList = this.rightCheckBoxObjectList;

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

            let checkBoxHiragana = this.leftCheckBoxObjectList[0];
            let checkBoxKatakana = this.leftCheckBoxObjectList[1];

            let checkboxBasic = this.rightCheckBoxObjectList[0];
            let checkboxVoiced = this.rightCheckBoxObjectList[1];
            let checkboxCombo1 = this.rightCheckBoxObjectList[2];
            let checkboxCombo2 = this.rightCheckBoxObjectList[3];

            let hiraganaBasicCheckboxCheckedList = [];
            let hiraganaVoicedCheckboxCheckedList = [];
            let hiraganaCombo1CheckboxCheckedList = [];
            let hiraganaCombo2CheckboxCheckedList = [];

            let katakanaBasicCheckboxCheckedList = [];
            let katakanaVoicedCheckboxCheckedList = [];
            let katakanaCombo1CheckboxCheckedList = [];
            let katakanaCombo2CheckboxCheckedList = [];

            let onlyRomaji;

            if (checkboxBasic.isChecked === true) {
                if (checkboxBasic.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.basic]);

                    if (checkBoxHiragana.isChecked === true) {
                        hiraganaBasicCheckboxCheckedList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        katakanaBasicCheckboxCheckedList = kana.toKatakana(onlyRomaji);
                    }
                }
            }


            if (checkboxVoiced.isChecked === true) {
                if (checkboxVoiced.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.voiced]);

                    if (checkBoxHiragana.isChecked === true) {
                        hiraganaVoicedCheckboxCheckedList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        katakanaVoicedCheckboxCheckedList = kana.toKatakana(onlyRomaji);
                    }
                }
            }

            if (checkboxCombo1.isChecked === true) {
                if (checkboxCombo1.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.combo1]);

                    if (checkBoxHiragana.isChecked === true) {
                        hiraganaCombo1CheckboxCheckedList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        katakanaCombo1CheckboxCheckedList = kana.toKatakana(onlyRomaji);
                    }
                }
            }

            if (checkboxCombo2.isChecked === true) {
                if (checkboxCombo2.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.combo2]);

                    if (checkBoxHiragana.isChecked === true) {
                        hiraganaCombo2CheckboxCheckedList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        katakanaCombo2CheckboxCheckedList = kana.toKatakana(onlyRomaji);
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

            // this.hide();
            // menuScreen.hide();
            console.log(cardsForFlashCards)
            // flashCardScreen.show(cardsForFlashCards);
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
        modalCustomInterface.show(title, checkBoxObject);
    }
}