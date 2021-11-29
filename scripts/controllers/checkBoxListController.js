class CheckBoxListController {
    constructor(elementList, hasEditIcon, alphabet, families, confirmButton, mustHasAtLeastOneChecked, color, defaultCheckList = [null]) {
        this.elementList = elementList;
        this.hasEditIcon = hasEditIcon;
        this.alphabet = alphabet;
        this.families = families;
        this.confirmButton = confirmButton;
        this.mustHasAtLeastOneChecked = mustHasAtLeastOneChecked;
        this.color = color;
        this.defaultCheckList = defaultCheckList;
    }

    checkedAmount = undefined;
    confirmButton = undefined;
    mustHasAtLeastOneChecked = undefined;

    isLastChecked(list, selectedIndex) {
        this.setCheckedAmount(list);

        if (this.checkedAmount > 1) {
            return true;
        } else if (this.checkedAmount === 1 && list[selectedIndex].isChecked === false) {
            return true;
        }
        return false;
    }

    setCheckedAmount(list) {
        let checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        this.checkedAmount = checkBoxCheckedList.length;
    }

    parseFamilyOfCheckedToHiragana(checkBoxObjectList) {
        let result = [];
        let checkBoxCheckedList = this.getAllChecked(checkBoxObjectList);
        checkBoxCheckedList.forEach((checkBoxObject) => {
            if (checkBoxObject.alphabet === "hiragana") {
                checkBoxObject.family.forEach(element => {
                    result.push(wanakana.toHiragana(element));
                });
            }
        })
        return result;
    }

    parseFamilyOfCheckedToKatakana(checkBoxObjectList) {
        let result = [];
        let checkBoxCheckedList = this.getAllChecked(checkBoxObjectList);
        checkBoxCheckedList.forEach((checkBoxObject) => {
            if (checkBoxObject.alphabet === "katakana") {
                checkBoxObject.family.forEach(element => {
                    result.push(wanakana.toKatakana(element));
                });
            }
        })
        return result;
    }

    getAllChecked(list) {
        let checkBoxCheckedList = [];
        checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        return checkBoxCheckedList;
    }

    reset(checkBoxObjectList) {
        // Return an object list of check box that its first element is checked by default
        for (let index = 0; index < checkBoxObjectList.length; index++) {
            const checkBoxObject = checkBoxObjectList[index];

            if (index === 0) {
                checkBoxObject.isChecked = true;
                checkBoxObject.showCheckBoxAndCheckMark();
                checkBoxObject.showEditIcon();
            } else {
                checkBoxObject.isChecked = false;
                checkBoxObject.hideCheckBoxAndCheckMark();
                checkBoxObject.hideEditIcon();
            }
            checkBoxObject.isEdited = false;
        }
    }

    build() {
        // Return an object list of check box that its first element is checked by default
        const checkBoxObjectList = [];

        for (let index = 0; index < this.elementList.length; index++) {
            const checkBoxElement = this.elementList[index];
            const checkBoxObject = new CheckBoxController();

            // It checks the first checkbox as default
            if (index === 0) {
                checkBoxObject.isChecked = true;
            } else {
                checkBoxObject.isChecked = false;
            }

            if (this.defaultCheckList.includes(null) === false) {
                checkBoxObject.isChecked = this.defaultCheckList[index];
            }

            checkBoxObject.color = this.color;
            checkBoxObject.name = checkBoxElement.getAttribute("name");
            checkBoxObject.htmlElement = checkBoxElement;
            checkBoxObject.checkMark = checkBoxElement.children[0];
            checkBoxObject.checkMarkCircle = checkBoxElement.parentElement.children[0];
            
            if (this.hasEditIcon === true) {
                checkBoxObject.editIcon = checkBoxElement.parentElement.parentElement.children[1];
                checkBoxObject.hasEditIcon = true;
            }

            if (
                this.alphabet !== undefined) {
                checkBoxObject.alphabet = this.alphabet;
            }

            if (this.families !== undefined) {
                checkBoxObject.family = this.families[index];
                checkBoxObject.alphabet = checkBoxElement.getAttribute("alphabet")
            }

            checkBoxObjectList.push(checkBoxObject);
        }

        this.initializeCheckboxList(checkBoxObjectList);

        return checkBoxObjectList;
    }

    // It checks the first checkbox and inserts the click event in everyone 
    initializeCheckboxList(checkBoxObjectList) {
        for (let index = 0; index < checkBoxObjectList.length; index++) {
            const checkBoxObject = checkBoxObjectList[index];
            const checkBoxElement = checkBoxObject.htmlElement;

            if (checkBoxObject.isChecked === true) {
                checkBoxObject.showCheckBoxAndCheckMark();
                checkBoxObject.showEditIcon();
            } else {
                checkBoxObject.hideCheckBoxAndCheckMark();
            }

            // It adds click event in checkbox
            checkBoxElement.addEventListener(("click"), () => {
                this.checkBoxClickEventListener(checkBoxObject, checkBoxObjectList, index);
            })

            // It adds click event in checkbox's edit icon
            if (checkBoxObject.hasEditIcon === true) {
                checkBoxObject.editIcon.addEventListener("click", () => {
                    this.editIconClickEventListener(checkBoxObject);
                })
            }
        }
    }

    checkBoxClickEventListener(checkBoxObject, checkBoxObjectList, index) {
        checkBoxObject.animateCheckBoxAndCheckMarkCircle();

        if (this.isLastChecked(checkBoxObjectList, index) === true) {

            if (checkBoxObject.isChecked === true) {
                this.disableCheckBox(checkBoxObject);
            } else {
                this.enableCheckBox(checkBoxObject);
            }
        } else {
            if (this.mustHasAtLeastOneChecked === false) {
                if (checkBoxObject.isChecked === true) {
                    this.disableCheckBox(checkBoxObject);
                    this.confirmButton.disabled = true;
                    this.confirmButton.style.opacity = ".5";
                } else {
                    this.enableCheckBox(checkBoxObject);
                    this.confirmButton.disabled = false;
                    this.confirmButton.style.opacity = "1";
                }
            }
        }
    }

    enableCheckBox(checkBoxObject) {
        checkBoxObject.isChecked = true;
        checkBoxObject.showCheckBoxAndCheckMark();
        checkBoxObject.showEditIcon();
    }

    disableCheckBox(checkBoxObject) {
        checkBoxObject.isChecked = false;
        checkBoxObject.hideCheckBoxAndCheckMark();
        checkBoxObject.hideEditIcon();
    }

    async editIconClickEventListener(checkBoxObject) {
        await checkBoxObject.animateEditIcon();
        modalCustomInterface.show(checkBoxObject);
    }
}