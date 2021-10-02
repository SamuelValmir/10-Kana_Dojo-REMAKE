"use strict";

let modalMain;
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

let modalCustomCheckBoxList = [];
let modalButtons;

let currentEditIcon;

let studySections = document.querySelectorAll(".menu-screen .container .study-section");

for (const studySection of studySections) {
    if (studySection.classList.contains("study-section")) {
        studySection.addEventListener("click", function () {
            if (studySection.classList.contains("study-section-reference")) {
                document.querySelector(".menu-screen").style.display = "none";
                document.querySelector(".reference-screen").style.display = "block";
                changeScreen(".menu-screen", ".reference-screen");
                drawCardsOnReferenceScreen("hiragana");
            } else if (studySection.classList.contains("study-section-flash-card")) {
                modalMain = document.querySelector(".modal-main")
                modalMain.style.display = "flex";
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

let insertAnimationInModalMainCheckbox = () => {
    checkBoxList = document.querySelectorAll(".checkbox-container .checkbox");
    checkBoxLeftList = [];
    checkBoxRightList = [];

    for (let i = 0; i < checkBoxList.length; i++) {
        let checkBox = checkBoxList[i];
        let checkMarkCircle = checkBox.parentElement.children[0];
        let checkMark = checkBox.children[0];

        let showCheckBoxAndCheckMark = () => {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
            checkBox.style.borderColor = MENU_PRIMARY_COLOR;
            checkMark.style.display = "block"
        }

        let hideCheckBoxAndCheckMark = () => {
            checkBox.dataset.checked = "false";
            checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
            checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
            checkMark.style.display = "none"
        }

        // It is for always reset the values when 
        hideCheckBoxAndCheckMark();


        // It separates who go to left list and who go to right list
        if (i < 2) {
            checkBoxLeftList.push(checkBox);
        } else {
            checkBoxRightList.push(checkBox);
        }

        if (i === 0 || i === 2) {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
            checkBox.style.borderColor = MENU_PRIMARY_COLOR;
            checkMark.style.display = "block"
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
                    console.log("hide")
                    hideCheckBoxAndCheckMark();
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    console.log("show")
                    showCheckBoxAndCheckMark();
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

        let showCheckBoxAndCheckMark = () => {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = MENU_PRIMARY_COLOR;
            checkBox.style.borderColor = MENU_PRIMARY_COLOR;
            checkMark.style.display = "block"
        }

        let hideCheckBoxAndCheckMark = () => {
            checkBox.dataset.checked = "false";
            checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
            checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
            checkMark.style.display = "none"
        }

        // It is for always reset the values when 
        hideCheckBoxAndCheckMark();

        if (i === 0) {
            showCheckBoxAndCheckMark();
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
                    console.log("hide")
                    hideCheckBoxAndCheckMark();
                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    console.log("show")
                    showCheckBoxAndCheckMark();
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

let basicCheckboxCheckedList = [];
let voicedCheckboxCheckedList = [];
let combo1CheckboxCheckedList = [];
let combo2CheckboxCheckedList = [];

let executeModalButton = (modalButton) => {

    function filter(callback) {
        let filteredCheckBoxList = [];
        for (let checkBox of this) {
            if (callback(checkBox)) {
                filteredCheckBoxList.push({ "family": checkBox.getAttribute("family"), "alphabet": checkBox.getAttribute("alphabet") });
            }
        }

        return filteredCheckBoxList;
    }

    if (modalCustomCheckBoxList !== []) {
        modalCustomCheckBoxList.filter = filter;
    }

    if (modalButton.classList.contains("modal-main-button-back")) {
        modalMain.style.display = "none";
    } else if (modalButton.classList.contains("modal-main-button-start")) {
        modalMain.style.display = "none";

        checkboxBasic = document.querySelector(".modal-main .checkbox-basic")
        checkboxVoiced = document.querySelector(".modal-main .checkbox-voiced")
        checkboxCombo1 = document.querySelector(".modal-main .checkbox-combo1")
        checkboxCombo2 = document.querySelector(".modal-main .checkbox-combo2")

        if (checkboxBasic.dataset.checked === "true") {
            if (checkboxBasic.dataset.edited === "false") {
                //! Test this!
                console.log("aaaaaa")
                basicCheckboxCheckedList = kanaBasic;
            }
        }
        if (checkboxVoiced.dataset.checked === "true") {
            voicedCheckboxCheckedList = kanaVoiced;
        }
        if (checkboxCombo1.dataset.checked === "true") {
            combo1CheckboxCheckedList = kanaCombo1;
        }
        if (checkboxCombo2.dataset.checked === "true") {
            combo2CheckboxCheckedList = kanaCombo2;
        }

        console.log(checkBoxHiragana)
        console.log(checkBoxKatakana)

        if (checkBoxHiragana.dataset.checked === "false" && basicCheckboxCheckedList.find(
            (element) => element.alphabet === "hiragana")) {

            let a = basicCheckboxCheckedList.filter((element) => {
                if (element.alphabet === "hiragana") {
                    return element;
                }
            })
            console.log(a)
        }

        console.log(basicCheckboxCheckedList)
        console.log(voicedCheckboxCheckedList)
        console.log(combo1CheckboxCheckedList)
        console.log(combo2CheckboxCheckedList)
        //To show flash card screen

    } else if (modalButton.classList.contains("modal-custom-button-cancel")) {
        modalCustom.style.display = "none";

        // It changes the dataset-edit of the checkbox of the edit icon that was clicked to show the modal custom
        currentEditIcon.parentElement.children[0].children[1].dataset.edited = "false";

        switch (currentEditIcon.name) {
            case "Basic":
                basicCheckboxCheckedList = kanaBasic;
                break;
            case "Voiced":
                voicedCheckboxCheckedList = kanaVoiced;
                break;
            case "Combo 1":
                combo1CheckboxCheckedList = kanaCombo1;
                break;
            case "Combo 2":
                combo2CheckboxCheckedList = kanaCombo2;
                break;

            default:
                alert("Error on switch casse of the execute modal button");
                break;
        }
    } else if (modalButton.classList.contains("modal-custom-button-finish")) {
        modalCustom.style.display = "none";

        // It changes the dataset-edit of the checkbox of the edit icon that was clicked to show the modal custom
        currentEditIcon.parentElement.children[0].children[1].dataset.edited = "true";

        switch (currentEditIcon.name) {
            case "Basic":
                basicCheckboxCheckedList = modalCustomCheckBoxList.filter((isChecked));
                break;
            case "Voiced":
                voicedCheckboxCheckedList = modalCustomCheckBoxList.filter((isChecked));
                break;
            case "Combo 1":
                combo1CheckboxCheckedList = modalCustomCheckBoxList.filter((isChecked));
                break;
            case "Combo 2":
                combo2CheckboxCheckedList = modalCustomCheckBoxList.filter((isChecked));
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
            group = kanaBasic;
            break;
        case "Voiced":
            group = kanaVoiced;
            break;
        case "Combo 1":
            group = kanaCombo1;
            break;
        case "Combo 2":
            group = kanaCombo2;
            break;
        default:
            break;
    }
    // It defines if it will be whiten in hiragana or in katakana
    let showHiragana = false;
    let showKatakana = false;

    if (checkBoxHiragana.dataset.checked === "true") {
        // console.log("ht")
        showHiragana = true;
    }

    if (checkBoxKatakana.dataset.checked === "true") {
        // console.log("kt")
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
