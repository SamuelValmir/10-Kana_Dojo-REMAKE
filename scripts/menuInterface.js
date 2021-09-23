"use strict";

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
                document.querySelector(".modal").style.display = "flex";
                insertAnimationInModalButtons();
                insertAnimationInCheckbox();
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

let insertAnimationInModalButtons = () => {
    let modalButtons = document.querySelectorAll(".modal-bottom div");
    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener("click", () => {
            modalButton.animate([
                { backgroundColor: "#ddd" },
                { backgroundColor: "var(--white)" },
            ], 500)
        });
    })
}

let insertAnimationInCheckbox = () => {
    let checkBoxList = document.querySelectorAll(".checkbox-container input");
    checkBoxList.forEach((checkBox) => {
        checkBox.addEventListener('click', () => {

            let checkMarkCircle = checkBox.parentElement.children[1];
            checkMarkCircle.animate([
                { opacity: 1 },
                { transform: "scale(3.5)" }
            ], 200);

            let checkMark = checkBox.parentElement.children[2];
            checkMark.animate([
                { transform: "scale(0.8)" }
            ], 200)
        });

    });
}
