"use strict";

let modalMainElement;
let modalCustom;

let checkBoxList;
let checkBoxLeftList;
let checkBoxRightList;

let checkBoxHiragana
let checkBoxKatakana

let checkboxBasic
let checkboxVoiced
let checkboxCombo1
let checkboxCombo2

let hiraganaBasicCheckboxCheckedList = [];
let hiraganaVoicedCheckboxCheckedList = [];
let hiraganaCombo1CheckboxCheckedList = [];
let hiraganaCombo2CheckboxCheckedList = [];

let katakanaBasicCheckboxCheckedList = [];
let katakanaVoicedCheckboxCheckedList = [];
let katakanaCombo1CheckboxCheckedList = [];
let katakanaCombo2CheckboxCheckedList = [];

let modalCustomCheckBoxList = [];
let modalButtons;

let currentEditIcon;

let studySections = document.querySelectorAll(".menu-screen .container .study-section");

for (const studySection of studySections) {
    if (studySection.classList.contains("study-section")) {
        studySection.addEventListener("click", function () {
            if (studySection.classList.contains("study-section-reference")) {
                menuScreen.hide();
                referenceScreen.show();
                changeScreen(".menu-screen", ".reference-screen");
                referenceScreen.drawCards(HIRAGANA);
            } else if (studySection.classList.contains("study-section-flash-card")) {
                modalMainElement = document.querySelector(".modal-main")
                modalMainElement.style.display = "flex";
            } /* else if (studySection.classList.contains("study-section-reference")) {
                document.querySelector(".menu-screen").style.display = "none";
                document.querySelector(".reference-screen").style.display = "block";
                changeScreen(".menu-screen", ".reference-screen");
            }
            
            */
        });
    }
}

function goToPlayMenu() {

}

function goToLearnMenu() {

}

let setModalButtons = () => {
    modalButtons = document.querySelectorAll(".modal-bottom .modal-button");
}

let showCheckBoxAndCheckMark = (checkBox, checkMark) => {
    checkBox.dataset.checked = "true";
    checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
    checkBox.style.borderColor = MENU_PRIMARY_COLOR;
    checkMark.style.display = "block"
}

let hideCheckBoxAndCheckMark = (checkBox, checkMark) => {
    checkBox.dataset.checked = "false";
    checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
    checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
    checkMark.style.display = "none"
}

let insertAnimationInModalMainCheckbox = () => {
    checkBoxList = document.querySelectorAll(".checkbox-container .checkbox");
    checkBoxLeftList = [];
    checkBoxRightList = [];

    for (let i = 0; i < checkBoxList.length; i++) {
        let checkBox = checkBoxList[i];
        let checkMarkCircle = checkBox.parentElement.children[0];
        let checkMark = checkBox.children[0];


        // It is for always reset the values when 
        hideCheckBoxAndCheckMark(checkBox, checkMark);


        // It separates who go to left list and who go to right list
        if (i < 2) {
            checkBoxLeftList.push(checkBox);
        } else {
            checkBoxRightList.push(checkBox);
        }

        if (i === 0 || i === 2) {
            showCheckBoxAndCheckMark(checkBox, checkMark);
        }

        checkBox.addEventListener('click', () => {
            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);

            checkBox.animate([
                { transform: "scale(0.8)" }
            ], 200);

            let posLeft = checkBoxLeftList.findIndex((element) => element === checkBox);
            let posRight = checkBoxRightList.findIndex((element) => element === checkBox);

            checkBoxLeftList.filter = filter;
            checkBoxRightList.filter = filter;

            let numberOfCheckboxChecked;
            if (posLeft > -1) {
                numberOfCheckboxChecked = checkBoxLeftList.filter(isChecked);
            } else if (posRight > -1) {
                numberOfCheckboxChecked = checkBoxRightList.filter(isChecked);
            }

            let lastCheckBoxCheckLeft = checkBoxLeftList.find((e) => e.dataset.checked === "true");
            let lastCheckBoxCheckRight = checkBoxRightList.find((e) => e.dataset.checked === "true");

            if (numberOfCheckboxChecked == 1 && (lastCheckBoxCheckLeft === checkBox || lastCheckBoxCheckRight === checkBox)) {
                setTimeout(() => {
                    alert("At least one option must be selected!");
                }, 300);
            } else {
                if (checkBox.dataset.checked === "true") {
                    checkBox.dataset.edited = "false";
                    hideCheckBoxAndCheckMark(checkBox, checkMark);
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    showCheckBoxAndCheckMark(checkBox, checkMark);
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, true);
                    }
                }

            }
        });
    }
}

let insertAnimationInModalCustomCheckbox = () => {

    // It converts a NodeList object to an array.
    // It works well in all modern and old browsers including IE 6+.
    modalCustomCheckBoxList = Array.prototype.slice.call(modalCustomCheckBoxList);
    for (let i = 0; i < modalCustomCheckBoxList.length; i++) {
        let checkBox = modalCustomCheckBoxList[i];
        let checkMarkCircle = checkBox.parentElement.children[0];
        let checkMark = checkBox.children[0];

        let showCheckBoxAndCheckMark = (checkBox, checkMark) => {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
            checkBox.style.borderColor = MENU_PRIMARY_COLOR;
            checkMark.style.display = "block"
        }

        let hideCheckBoxAndCheckMark = (checkBox, checkMark) => {
            checkBox.dataset.checked = "false";
            checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
            checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
            checkMark.style.display = "none"
        }

        // It is for always reset the values when 
        hideCheckBoxAndCheckMark(checkBox, checkMark);

        if (i === 0) {
            showCheckBoxAndCheckMark(checkBox, checkMark);
        }

        checkBox.addEventListener('click', () => {

            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);

            checkBox.animate([
                { transform: "scale(0.8)" }
            ], 200);

            modalCustomCheckBoxList.filter = filter;
            checkBoxRightList.filter = filter;

            let numberOfCheckboxChecked = modalCustomCheckBoxList.filter(isChecked);
            let modalCustomLastCheckBoxCheck = modalCustomCheckBoxList.find((e) => e.dataset.checked === "true");

            if (numberOfCheckboxChecked == 1 && (modalCustomLastCheckBoxCheck === checkBox)) {
                setTimeout(() => {
                    alert("At least one option must be selected!");
                }, 300);
            } else {
                if (checkBox.dataset.checked === "true") {
                    hideCheckBoxAndCheckMark(checkBox, checkMark);
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    showCheckBoxAndCheckMark(checkBox, checkMark);
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, true);
                    }
                }

            }
        });
    }
}


// It shows the edit icon when check box is checked

let showEditIcon = (checkBox, toShow) => {
    let checkBoxEditIcon = checkBox.parentElement.parentElement.children[1];
    if (toShow === true) {
        checkBoxEditIcon.style.display = "block"
    } else {
        checkBoxEditIcon.style.display = "none"
    }
}

let insertAnimationInModalButtons = () => {
    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener("click", () => {
            let modalButtonAnimation = modalButton.animate([
                { backgroundColor: "#ddd" },
                { backgroundColor: "var(--white)" },
            ], 300);

            // When animation is finished the button execute it function
            modalButtonAnimation.addEventListener('finish', () => {
                executeModalButton(modalButton);
            })
        });
    })
}

let executeModalButton = (modalButton) => {

    function filter(callback, alphabet, type) {
        let filteredCheckBoxList = [];
        let result = [];

        // It adds in filteredCheckBoxList all the families of the alphabet that are checked in the checkbox 
        for (let checkBox of this) {
            if (callback(checkBox)) {
                if (checkBox.getAttribute("alphabet") === alphabet) {
                    for (let i = 0; i < type.length; i++) {
                        if (type[i][0] === checkBox.getAttribute("family")) {
                            filteredCheckBoxList.push(type[i][1]);
                        }
                    }
                }
            }
        }

        // It adds in result array all element of the families that are in filteredCheckBoxList 
        if (filteredCheckBoxList.length > 0) {
            for (let i1 = 0; i1 < filteredCheckBoxList.length; i1++) {
                let family = filteredCheckBoxList[i1];
                for (let i2 = 0; i2 < family.length; i2++) {
                    let kana = family[i2];

                    if (alphabet === "hiragana") {
                        kana = wanakana.toHiragana(kana)

                    } else if (alphabet === "katakana") {
                        kana = wanakana.toKatakana(kana);
                    }

                    result.push(kana);
                }

            }

        }
        return result;
    }

    let resetModalMain = () => {
        hiraganaBasicCheckboxCheckedList = [];
        hiraganaVoicedCheckboxCheckedList = [];
        hiraganaCombo1CheckboxCheckedList = [];
        hiraganaCombo2CheckboxCheckedList = [];

        katakanaBasicCheckboxCheckedList = [];
        katakanaVoicedCheckboxCheckedList = [];
        katakanaCombo1CheckboxCheckedList = [];
        katakanaCombo2CheckboxCheckedList = [];

        for (let i = 0; i < checkBoxList.length; i++) {
            let checkBox = checkBoxList[i];
            let checkMark = checkBox.children[0];

            hideCheckBoxAndCheckMark(checkBox, checkMark);

            if (i === 0 || i === 2) {
                showCheckBoxAndCheckMark(checkBox, checkMark);
            }
        }
    }

    if (modalCustomCheckBoxList !== []) {
        modalCustomCheckBoxList.filter = filter;
    }


    if (modalButton.classList.contains("modal-main-button-back")) {
        modalMainElement.style.display = "none";
        resetModalMain();

    } else if (modalButton.classList.contains("modal-main-button-start")) {
        modalMainElement.style.display = "none";

        checkboxBasic = document.querySelector(".modal-main .checkbox-basic");
        checkboxVoiced = document.querySelector(".modal-main .checkbox-voiced");
        checkboxCombo1 = document.querySelector(".modal-main .checkbox-combo1");
        checkboxCombo2 = document.querySelector(".modal-main .checkbox-combo2");

        if (checkBoxHiragana.dataset.checked === "true") {  // If checkbox hiragana is checked...
            if (checkboxBasic.dataset.checked === "true") {
                if (checkboxBasic.dataset.edited === "false") {
                    hiraganaBasicCheckboxCheckedList = [...kana.basic].map((kana) => wanakana.toHiragana(kana));
                }
            }

            if (checkboxVoiced.dataset.checked === "true") {
                if (checkboxVoiced.dataset.edited === "false") {
                    hiraganaVoicedCheckboxCheckedList = [...kana.voiced].map((kana) => wanakana.toHiragana(kana));
                }
            }

            if (checkboxCombo1.dataset.checked === "true") {
                if (checkboxCombo1.dataset.edited === "false") {
                    hiraganaCombo1CheckboxCheckedList = [...kana.combo1].map((kana) => wanakana.toHiragana(kana));
                }
            }

            if (checkboxCombo2.dataset.checked === "true") {
                if (checkboxCombo2.dataset.edited === "false") {
                    hiraganaCombo2CheckboxCheckedList = [...kana.combo2].map((kana) => wanakana.toHiragana(kana));
                }
            }


        }
        if (checkBoxKatakana.dataset.checked === "true") { // If checkbox hiragana is not checked...
            if (checkboxBasic.dataset.checked === "true") {
                if (checkboxBasic.dataset.edited === "false") {
                    katakanaBasicCheckboxCheckedList = [...kana.basic].map((kana) => wanakana.toKatakana(kana));
                }
            }

            if (checkboxVoiced.dataset.checked === "true") {
                if (checkboxVoiced.dataset.edited === "false") {
                    katakanaVoicedCheckboxCheckedList = [...kana.voiced].map((kana) => wanakana.toKatakana(kana));
                }
            }

            if (checkboxCombo1.dataset.checked === "true") {
                if (checkboxCombo1.dataset.edited === "false") {
                    katakanaCombo1CheckboxCheckedList = [...kana.combo1].map((kana) => wanakana.toKatakana(kana));
                }
            }

            if (checkboxCombo2.dataset.checked === "true") {
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


        cardsForFlashCards = cardsForFlashCards.flat();
        resetModalMain();

        // Initialize the flashCardScreen
        // I must make the flashCardScreen do this 
        flashCardScreen.items.cards = cardsForFlashCards;
        flashCardScreen.setItemsEventListener();
        flashCardScreen.items.buildCards();

        document.querySelector(".menu-screen").style.display = "none";
        flashCardScreen.show();

    } else if (modalButton.classList.contains("modal-custom-button-cancel")) {
        modalCustom.style.display = "none";

        // It changes the dataset-edit of the checkbox of the edit icon that was clicked to show the modal custom
        currentEditIcon.parentElement.children[0].children[1].dataset.edited = "false";

    } else if (modalButton.classList.contains("modal-custom-button-finish")) {
        modalCustom.style.display = "none";

        // It changes the dataset-edit of the checkbox of the edit icon that was clicked to show the modal custom
        currentEditIcon.parentElement.children[0].children[1].dataset.edited = "true";

        switch (currentEditIcon.name) {
            case "Basic":
                hiraganaBasicCheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.basicFamilies));
                katakanaBasicCheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.basicFamilies));
                break;
            case "Voiced":
                hiraganaVoicedCheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.voicedFamilies));
                katakanaVoicedCheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.voicedFamilies));
                break;
            case "Combo 1":
                hiraganaCombo1CheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.combo1Families));
                katakanaCombo1CheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.combo1Families));
                break;
            case "Combo 2":
                hiraganaCombo2CheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.combo2Families));
                katakanaCombo2CheckboxCheckedList = modalCustomCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.combo2Families));
                break;

            default:
                alert("Error on switch casse of the execute modal button");
                break;
        }
    }
}

let setCheckboxEditIcon = () => {
    //It storage all Check Boxes that are in the right content of the modal-main.
    let checkBoxEditIconList = document.querySelectorAll(".modal-main .modal-content-right span img");
    for (let i = 0; i < checkBoxEditIconList.length; i++) {
        const checkBoxEditIcon = checkBoxEditIconList[i];
        // The first edit icon will appears by default
        if (i == 0) {
            checkBoxEditIcon.style.display = "block";
        } else {
            checkBoxEditIcon.style.display = "none";
        }
        checkBoxEditIcon.addEventListener("click", async () => {
            await animateEditIcon(checkBoxEditIcon);
            fillModalCustomContent(checkBoxEditIcon);
            currentEditIcon = checkBoxEditIcon;
        })

    }

}

let animateEditIcon = (checkBoxEditIcon) => {

    let promise = new Promise((resolve) => {
        let checkBoxEditIconAnimation = checkBoxEditIcon.animate([
            { transform: "scale(.8)" }
        ], 150);

        checkBoxEditIconAnimation.addEventListener('finish', () => {
            resolve();
        })
    })

    return promise;
}

let fillModalCustomContent = (checkBoxEditIcon) => {
    modalCustom = document.querySelector(".modal-custom");
    modalCustom.style.display = "flex";

    // It defines the title
    let modalCustomTopText = document.querySelector(".modal-custom .modal-top h4");
    modalCustomTopText.innerHTML = "Custom " + checkBoxEditIcon.name;

    let modalCustomContent = document.querySelector(".modal-custom .modal-content");
    modalCustomContent.innerHTML = "";

    let group;

    // It defines which group it will be displayed in modal custom
    switch (checkBoxEditIcon.name) {
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

    if (checkBoxHiragana.dataset.checked === "true") {
        showHiragana = true;
    }

    if (checkBoxKatakana.dataset.checked === "true") {
        showKatakana = true;
    }

    if (showHiragana) {
        insertFamilies(group, "hiragana", modalCustomContent);
    }

    if (showKatakana) {
        insertFamilies(group, "katakana", modalCustomContent);
    }

    insertAnimationInModalCustomCheckbox();
}

let insertFamilies = (group, alphabet, modalCustomContent) => {

    // It makes the content of the Modal Custom
    for (let i = 0; i < Object.values(group).length; i++) {
        const family = Object.values(group)[i];

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

        modalCustomContent.appendChild(familyElement);
        familyElement.appendChild(checkMarkCircleElement);
        familyElement.appendChild(checkBoxElement);
        familyElement.appendChild(familyContentElement);
        checkBoxElement.appendChild(checkMarkElement);
    }
    modalCustomCheckBoxList = document.querySelectorAll(".modal-custom .checkbox");
}

let isChecked = e => e.dataset.checked === "true";

function filter(callback) {
    let checkedNumber = 0;
    this.forEach((e) => {
        if (callback(e) === true) {
            checkedNumber++;
        }
    })
    return checkedNumber;
}

setModalButtons();
insertAnimationInModalButtons();
insertAnimationInModalMainCheckbox();
setCheckboxEditIcon();
checkBoxHiragana = checkBoxLeftList[0];
checkBoxKatakana = checkBoxLeftList[1];
