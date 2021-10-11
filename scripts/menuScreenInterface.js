// "use strict";

// let modalCustomm;

// let checkBoxListt;
// let checkBoxLeftList;
// let checkBoxRightList;

// let checkBoxHiragana
// let checkBoxKatakana

// let checkboxBasic
// let checkboxVoiced
// let checkboxCombo1
// let checkboxCombo2

// let hiraganaBasicCheckboxCheckedList = [];
// let hiraganaVoicedCheckboxCheckedList = [];
// let hiraganaCombo1CheckboxCheckedList = [];
// let hiraganaCombo2CheckboxCheckedList = [];

// let katakanaBasicCheckboxCheckedList = [];
// let katakanaVoicedCheckboxCheckedList = [];
// let katakanaCombo1CheckboxCheckedList = [];
// let katakanaCombo2CheckboxCheckedList = [];

// let modalCustommCheckBoxList = [];

// let currentEditIcon;

// let executeModalButton = (modalButton) => {

//     function filter(callback, alphabet, type) {
//         let filteredCheckBoxList = [];
//         let result = [];

//         // It adds in filteredCheckBoxList all the families of the alphabet that are checked in the checkbox 
//         for (let checkBox of this) {
//             if (callback(checkBox)) {
//                 if (checkBox.getAttribute("alphabet") === alphabet) {
//                     for (let i = 0; i < type.length; i++) {
//                         if (type[i][0] === checkBox.getAttribute("family")) {
//                             filteredCheckBoxList.push(type[i][1]);
//                         }
//                     }
//                 }
//             }
//         }

//         // It adds in result array all element of the families that are in filteredCheckBoxList 
//         if (filteredCheckBoxList.length > 0) {
//             for (let i1 = 0; i1 < filteredCheckBoxList.length; i1++) {
//                 let family = filteredCheckBoxList[i1];
//                 for (let i2 = 0; i2 < family.length; i2++) {
//                     let kana = family[i2];

//                     if (alphabet === "hiragana") {
//                         kana = wanakana.toHiragana(kana)

//                     } else if (alphabet === "katakana") {
//                         kana = wanakana.toKatakana(kana);
//                     }

//                     result.push(kana);
//                 }

//             }

//         }
//         return result;
//     }

//     if (modalCustommCheckBoxList !== []) {
//         modalCustommCheckBoxList.filter = filter;
//     }

//     if (modalButton.classList.contains("modal-main-button-start")) {

//         cardsForFlashCards = cardsForFlashCards.flat();

//         // Initialize the flashCardScreen
//         // I must make the flashCardScreen do this 
//         flashCardScreen.items.cards = cardsForFlashCards;
//         flashCardScreen.setItemsEventListener();
//         flashCardScreen.items.buildCards();
//         document.querySelector(".menu-screen").style.display = "none";
//         flashCardScreen.show();

//     } else if (modalButton.classList.contains("modal-custom-button-cancel")) {
//         modalCustomm.style.display = "none";

//     } else if (modalButton.classList.contains("modal-custom-button-finish")) {
//         modalCustomm.style.display = "none";

//         // It changes the dataset-edit of the checkbox of the edit icon that was clicked to show the modal custom
//         currentEditIcon.parentElement.children[0].children[1].dataset.edited = "true";

//         switch (currentEditIcon.name) {
//             case "Basic":
//                 hiraganaBasicCheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.basicFamilies));
//                 katakanaBasicCheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.basicFamilies));
//                 break;
//             case "Voiced":
//                 hiraganaVoicedCheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.voicedFamilies));
//                 katakanaVoicedCheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.voicedFamilies));
//                 break;
//             case "Combo 1":
//                 hiraganaCombo1CheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.combo1Families));
//                 katakanaCombo1CheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.combo1Families));
//                 break;
//             case "Combo 2":
//                 hiraganaCombo2CheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "hiragana", Object.entries(kana.combo2Families));
//                 katakanaCombo2CheckboxCheckedList = modalCustommCheckBoxList.filter(isChecked, "katakana", Object.entries(kana.combo2Families));
//                 break;

//             default:
//                 alert("Error on switch casse of the execute modal button");
//                 break;
//         }
//     }
// }

// let isChecked = e => e.dataset.checked === "true";

// function filter(callback) {
//     let checkedNumber = 0;
//     this.forEach((e) => {
//         if (callback(e) === true) {
//             checkedNumber++;
//         }
//     })
//     return checkedNumber;
// }
