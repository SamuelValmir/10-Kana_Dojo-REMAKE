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
    let checkBoxList = document.querySelectorAll(".checkbox-container input");
    for (let i = 0; i < checkBoxList.length; i++) {
        let checkBox = checkBoxList[i];
        let checkMark = checkBox.parentElement.children[2];
        let checkMarkCircle = checkBox.parentElement.children[1];

        if (i == 0 || i == 2) {
            checkMark.style.backgroundColor = PRIMARY_COLOR;
            checkMark.style.borderColor = PRIMARY_COLOR;
        }

        checkBox.addEventListener('click', () => {
            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);

            checkMark.animate([
                { transform: "scale(0.8)" }
            ], 200)

            //! I need to not allow that modal has no checkbox checked.

            if (checkBox.checked == true) {
                checkMark.style.backgroundColor = PRIMARY_COLOR;
                checkMark.style.borderColor = PRIMARY_COLOR;
            } else {
                checkMark.style.backgroundColor = "rgb(0, 0, 0, 0)";
                checkMark.style.borderColor = "rgba(0, 0, 0, 0.6)";
            }

            // It show the edit icon only if check box is inside of modal content right
            if (checkBox.parentElement.parentElement.parentElement.classList.contains("modal-content-right")) {
                showEditIcon(checkBox);
            }
        });
    }
}

// It shows the edit icon when check box is checked
let showEditIcon = (checkBox) => {
    let checkBoxEditIcon = checkBox.parentElement.parentElement.children[1];
    if (checkBoxEditIcon.style.display === "none") {
        checkBoxEditIcon.style.display = "block"
    } else if (checkBoxEditIcon.style.display === "block") {
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
