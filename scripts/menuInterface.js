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