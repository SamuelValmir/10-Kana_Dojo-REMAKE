"use strict";

let modalMain;
let modalCustom;

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
//! When checked, i must make that it checkmark to be visible, and when not, to be invisible.

    let checkBoxList = document.querySelectorAll(".checkbox-container .checkbox");
    let checkBoxLeftList = [];
    let checkBoxRightList = [];

    for (let i = 0; i < checkBoxList.length; i++) {
        let checkBox = checkBoxList[i];
        let checkMarkCircle = checkBox.parentElement.children[0];
        let checkMark = checkBox.parentElement.children[1];

        // It separates who go to left list and who go to right list
        if (i < 2) {
            checkBoxLeftList.push(checkBox);
        } else {
            checkBoxRightList.push(checkBox);
        }

        if (i == 0 || i == 2) {
            checkBox.dataset.checked = "true";
            checkBox.style.backgroundColor = PRIMARY_COLOR;
            checkBox.style.borderColor = PRIMARY_COLOR;
        } else {
            checkBox.dataset.checked = "false";
        }

        checkBox.addEventListener('click', () => {
            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);

            checkMark.animate([
                { transform: "scale(0.8)" }
            ], 200);

            let posLeft = checkBoxLeftList.findIndex((element) => element === checkBox);
            let posRight = checkBoxRightList.findIndex((element) => element === checkBox);

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

                    // It show the edit icon only if check box is inside of modal content right
                    if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                        showEditIcon(checkBox, false);
                    }


                } else if (checkBox.dataset.checked === "false") {
                    checkBox.dataset.checked = "true";

                    checkBox.style.backgroundColor = PRIMARY_COLOR;
                    checkBox.style.borderColor = PRIMARY_COLOR;

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
            modalCustom = document.querySelector(".modal-custom");
            modalCustom.style.display = "flex";

            let checkBoxOfTheEditIcon = checkBoxEditIcon.parentElement.children[0].children[0];
            let modalCustomTopText = document.querySelector(".modal-custom .modal-top h4");
            modalCustomTopText.innerHTML = "Custom " + checkBoxOfTheEditIcon.name;
        })
    }

}
