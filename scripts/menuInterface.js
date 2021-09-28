"use strict";

let modalMain;
let modalCustom;

let checkBoxList;
let checkBoxLeftList;
let checkBoxRightList;

let modalButtons;

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
                setModalButtons();
                insertAnimationInCheckbox();
                insertAnimationInModalButtons();
                setCheckboxEditIcon();
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
    modalButtons = document.querySelectorAll(".modal-bottom div");
}

let insertAnimationInCheckbox = () => {
    checkBoxList = document.querySelectorAll(".checkbox-container .checkbox");
    checkBoxLeftList = [];
    checkBoxRightList = [];

    for (let i = 0; i < checkBoxList.length; i++) {
        let checkBox = checkBoxList[i];
        let checkMarkCircle = checkBox.parentElement.children[0];
        let checkMark = checkBox.children[0];

        // It separates who go to left list and who go to right list
        if (i < 2) {
            checkBoxLeftList.push(checkBox);
        } else {
            checkBoxRightList.push(checkBox);
        }

        if (i === 0 || i === 2) {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = PRIMARY_COLOR;
            checkBox.style.borderColor = PRIMARY_COLOR;
            checkMark.style.display = "block"
        } else {
            checkBox.dataset.checked = "false";
            checkMark.style.display = "none"
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

            let num;
            if (posLeft > -1) {
                num = checkBoxLeftList.filter(isChecked);
            } else if (posRight > -1) {
                num = checkBoxRightList.filter(isChecked);
            }

            let lastCheckBoxCheckLeft = checkBoxLeftList.find((e) => e.dataset.checked === "true");
            let lastCheckBoxCheckRight = checkBoxRightList.find((e) => e.dataset.checked === "true");

            if (num == 1 && (lastCheckBoxCheckLeft === checkBox || lastCheckBoxCheckRight === checkBox)) {

            } else {
                if (checkBox.dataset.checked === "true") {
                    checkBox.dataset.checked = "false";

                    checkBox.style.backgroundColor = "rgb(0, 0, 0, 0)";
                    checkBox.style.borderColor = "rgba(0, 0, 0, 0.6)";
                    checkMark.style.display = "none"

                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    checkBox.dataset.checked = "true";

                    checkBox.style.backgroundColor = PRIMARY_COLOR;
                    checkBox.style.borderColor = PRIMARY_COLOR;
                    checkMark.style.display = "block"

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
    if (modalButton.innerText === "BACK") {
        modalMain.style.display = "none";
    } else if (modalButton.innerText === "START") {
        modalMain.style.display = "none";
    } else if (modalButton.innerText === "CANCEL") {
        modalCustom.style.display = "none";
    } else if (modalButton.innerText === "FINISH") {
        modalCustom.style.display = "none";
    }
}

let setCheckboxEditIcon = () => {
    //It storage all Check Boxes that are in the right content of the modal-main.
    let checkBoxEditIconList = document.querySelectorAll(".modal-main .modal-content-right span img");
    for (let i = 0; i < checkBoxEditIconList.length; i++) {
        let checkBoxEditIcon = checkBoxEditIconList[i];
        // The first edit icon will appears by default
        if (i == 0) {
            checkBoxEditIcon.style.display = "block";
        } else {
            checkBoxEditIcon.style.display = "none";
        }
        checkBoxEditIcon.addEventListener("click", () => {
            fillModalCustomContent(checkBoxEditIcon);
        })
    }

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
    let checkBoxHiragana = checkBoxLeftList[0];
    let checkBoxKatakana = checkBoxLeftList[1];
    let showHiragana = false;
    let showKatakana = false;

    if (checkBoxHiragana.dataset.checked === "true") {
        console.log("ht")
        showHiragana = true;
    }
    
    if (checkBoxKatakana.dataset.checked === "true") {
        console.log("kt")
        showKatakana = true;
    }

    if (showHiragana) {
        insertFamilies(group, "hiragana", modalCustomContent);
    }

    if (showKatakana) {
        insertFamilies(group, "katakana", modalCustomContent);
    }
}

let insertFamilies = (group, alphabet, modalCustomContent) => {

    // It makes the content of the Modal Custom
    for (const family of Object.values(group)) {

        let familyElement = document.createElement("span");
        familyElement.classList.add("family");

        let checkBoxElement = document.createElement("span");
        checkBoxElement.classList.add("checkbox");

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
        familyElement.appendChild(checkBoxElement);
        familyElement.appendChild(familyContentElement);
    }
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