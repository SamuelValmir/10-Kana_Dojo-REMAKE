"use strict";

let modalMainInterface = {
    htmlElement: document.querySelector(".modal-main"),
    leftCheckBoxElementList: document.querySelectorAll(".modal-main .modal-content-left .checkbox"),
    rightCheckBoxElementList: document.querySelectorAll(".modal-main .modal-content-right .checkbox"),
    firstShow: true,
    leadsTo: undefined,

    leftCheckBoxObjectList: [],
    rightCheckBoxObjectList: [],

    hiraganaBasicList: [],
    hiraganaVoicedList: [],
    hiraganaCombo1List: [],
    hiraganaCombo2List: [],

    katakanaBasicList: [],
    katakanaVoicedList: [],
    katakanaCombo1List: [],
    katakanaCombo2List: [],

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
        this.hiraganaBasicList = [];
        this.hiraganaVoicedList = [];
        this.hiraganaCombo1List = [];
        this.hiraganaCombo2List = [];
        this.katakanaBasicList = [];
        this.katakanaVoicedList = [];
        this.katakanaCombo1List = [];
        this.katakanaCombo2List = [];
    },

    initialize() {
        if (this.firstShow === true) {
            this.firstShow = false;
            this.initializeButtons();

            // Build objects to the left and right checkboxes
            let leftCheckBoxElementList = this.leftCheckBoxElementList;
            let rightCheckBoxElementList = this.rightCheckBoxElementList;

            this.leftCheckBoxObjectList = checkBoxList.built(leftCheckBoxElementList);
            this.rightCheckBoxObjectList = checkBoxList.built(rightCheckBoxElementList, true);
        } else {
            checkBoxList.reset(this.leftCheckBoxObjectList);
            checkBoxList.reset(this.rightCheckBoxObjectList);
        }
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

            let onlyRomaji;

            if (checkboxBasic.isChecked === true) {
                if (checkboxBasic.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.basic]);

                    if (checkBoxHiragana.isChecked === true) {
                        this.hiraganaBasicList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        this.katakanaBasicList = kana.toKatakana(onlyRomaji);
                    }
                }
            }


            if (checkboxVoiced.isChecked === true) {
                if (checkboxVoiced.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.voiced]);

                    if (checkBoxHiragana.isChecked === true) {
                        this.hiraganaVoicedList = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        this.katakanaVoicedList = kana.toKatakana(onlyRomaji);
                    }
                }
            }

            if (checkboxCombo1.isChecked === true) {
                if (checkboxCombo1.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.combo1]);

                    if (checkBoxHiragana.isChecked === true) {
                        this.hiraganaCombo1List = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        this.katakanaCombo1List = kana.toKatakana(onlyRomaji);
                    }
                }
            }

            if (checkboxCombo2.isChecked === true) {
                if (checkboxCombo2.isEdited === false) {
                    onlyRomaji = kana.onlyRomajiOf([...kana.combo2]);

                    if (checkBoxHiragana.isChecked === true) {
                        this.hiraganaCombo2List = kana.toHiragana(onlyRomaji);
                    }
                    if (checkBoxKatakana.isChecked === true) {
                        this.katakanaCombo2List = kana.toKatakana(onlyRomaji);
                    }
                }
            }

            let cards = [
                [...this.hiraganaBasicList],
                [...this.hiraganaVoicedList],
                [...this.hiraganaCombo1List],
                [...this.hiraganaCombo2List],
                [...this.katakanaBasicList],
                [...this.katakanaVoicedList],
                [...this.katakanaCombo1List],
                [...this.katakanaCombo2List]];

            cards = cards.flat();
            cards = Cards.shuffle(cards);

            this.hide();
            menuScreenInterface.hide();

            switch (this.leadsTo) {
                case FLASH_CARD_SCREEN: {
                    flashCardScreenInterface.show(cards);
                } break;

                case QUIZ_SCREEN :{
                    quizScreenInterface.show(cards);
                    console.log(cards);
                } break;

            }

        })
    },
}