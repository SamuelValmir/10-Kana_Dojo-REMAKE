let modalCustomInterface = {
    htmlElement: document.querySelector(".modal-custom"),
    topText: document.querySelector(".modal-custom .modal-top h4"),
    checkBoxElementList: undefined,
    checkBoxObjectList: [],
    hiraganaCheckBoxObjectList: [],
    katakanaCheckBoxObjectList: [],
    content: document.querySelector(".modal-custom .modal-content"),

    buttons: {
        cancelButton: document.querySelector(".modal-custom-button-cancel"),
        finishButton: document.querySelector(".modal-custom-button-finish"),

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

    show(title, checkBoxObject) {
        this.htmlElement.style.display = "flex";
        this.initialize(title, checkBoxObject);
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize(title, checkBoxObject) {
        this.initializeButtons(checkBoxObject);

        this.topText.innerHTML = "Custom " + title;
        this.content.innerHTML = "";

        let group;

        // It defines which group it will be displayed in modal custom
        switch (title) {
            case "Basic":
                group = kana.basicFamilies;
                break;
            case "Voiced":
                group = kana.voicedFamilies;
                break;
            case "Combo 1":
                group = kana.combo1Families;
                break;
            case "Combo 2":
                group = kana.combo2Families;
                break;
            default:
                break;
        }
        // It defines if it will be whiten in hiragana or in katakana
        let showHiragana = false;
        let showKatakana = false;

        let checkBoxHiragana = modalMainInterface.leftCheckBoxObjectList[0]
        let checkBoxKatakana = modalMainInterface.leftCheckBoxObjectList[1];

        if (checkBoxHiragana.isChecked === true) {
            showHiragana = true;
        }

        if (checkBoxKatakana.isChecked === true) {
            showKatakana = true;
        }

        let families = [];
        if (showHiragana === true) {
            this.insertFamilies(group, "hiragana", families);
        }

        if (showKatakana === true) {
            this.insertFamilies(group, "katakana", families);
        }

        this.checkBoxObjectList = checkBoxList.built(this.checkBoxElementList, false, undefined, families);
    },

    initializeButtons(checkBoxObject) {
        let cancelButton = this.buttons.cancelButton;
        let finishButton = this.buttons.finishButton;

        cancelButton.addEventListener("click", async () => {
            await this.buttons.animate(cancelButton);
            this.hide();
        })

        finishButton.addEventListener("click", async () => {
            await this.buttons.animate(finishButton);
            checkBoxObject.isEdited = true;

            switch (checkBoxObject.name) {
                case "Basic":
                    modalMainInterface.hiraganaBasicList = checkBoxList.parseFamilyOfCheckedToHiragana(this.checkBoxObjectList);
                    modalMainInterface.katakanaBasicList = checkBoxList.parseFamilyOfCheckedToKatakana(this.checkBoxObjectList);
                    break;
                case "Voiced":
                    modalMainInterface.hiraganaVoicedList = checkBoxList.parseFamilyOfCheckedToHiragana(this.checkBoxObjectList);
                    modalMainInterface.katakanaVoicedList = checkBoxList.parseFamilyOfCheckedToKatakana(this.checkBoxObjectList);

                    break;
                case "Combo 1":
                    modalMainInterface.hiraganaCombo1List = checkBoxList.parseFamilyOfCheckedToHiragana(this.checkBoxObjectList);
                    modalMainInterface.katakanaCombo1List = checkBoxList.parseFamilyOfCheckedToKatakana(this.checkBoxObjectList);
                    break;
                case "Combo 2":
                    modalMainInterface.hiraganaCombo2List = checkBoxList.parseFamilyOfCheckedToHiragana(this.checkBoxObjectList);
                    modalMainInterface.katakanaCombo2List = checkBoxList.parseFamilyOfCheckedToKatakana(this.checkBoxObjectList);
                    break;

                default:
                    alert("Error on switch casse of the execute modal button");
                    break;
            }
            this.hide();
        })
    },

    insertFamilies(group, alphabet, families) {
        // It makes the content of the Modal Custom
        for (let i = 0; i < Object.values(group).length; i++) {
            const family = Object.values(group)[i];
            families.push(family);

            let familyElement = document.createElement("span");
            familyElement.classList.add("family");
            familyElement.style.name = Object.keys(group)[i];
            familyElement.style.position = "relative";

            let checkMarkCircleElement = document.createElement("span");
            checkMarkCircleElement.classList.add("checkmark-circle");

            let checkBoxElement = document.createElement("span");
            checkBoxElement.classList.add("checkbox");
            checkBoxElement.setAttribute("alphabet", alphabet);
            checkBoxElement.setAttribute("family", Object.entries(group)[i][0]);

            let checkMarkElement = document.createElement("span");
            checkMarkElement.classList.add("checkmark");

            let familyContentElement = document.createElement("span");
            familyContentElement.style.display = "flex";
            familyContentElement.style.gap = "10px"

            for (const kana of family) {
                let kanaElement = document.createElement("span");
                if (alphabet === "hiragana") {
                    kanaElement.innerHTML = wanakana.toHiragana(kana)
                } else if (alphabet === "katakana") {
                    kanaElement.innerHTML = wanakana.toKatakana(kana)
                }

                familyContentElement.appendChild(kanaElement);
            }

            this.content.appendChild(familyElement);
            familyElement.appendChild(checkMarkCircleElement);
            familyElement.appendChild(checkBoxElement);
            familyElement.appendChild(familyContentElement);
            checkBoxElement.appendChild(checkMarkElement);
        }
        this.checkBoxElementList = document.querySelectorAll(".modal-custom .checkbox");
    },
}