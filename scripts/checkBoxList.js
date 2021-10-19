let checkBoxList = {
    checkedAmount: undefined,
    canAnimate(list, selectedIndex) {
        this.setCheckedAmount(list);

        if (this.checkedAmount > 1) {
            return true;
        } else if (this.checkedAmount === 1 && list[selectedIndex].isChecked === false) {
            return true;
        }
        return false;
    },

    setCheckedAmount(list) {
        let checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        this.checkedAmount = checkBoxCheckedList.length;
    },

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
    },

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
    },

    getAllChecked(list) {
        let checkBoxCheckedList = [];
        checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        return checkBoxCheckedList;
    },

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
    },

    built(elementList, hasEditIcon = false, alphabet = undefined, families = undefined) {
        // Return an object list of check box that its first element is checked by default
        const checkBoxObjectList = [];
        for (let index = 0; index < elementList.length; index++) {
            const checkBoxElement = elementList[index];
            const checkBoxObject = new CheckBox();

            if (index === 0) {
                checkBoxObject.isChecked = true;
            } else {
                checkBoxObject.isChecked = false;
            }

            checkBoxObject.name = checkBoxElement.getAttribute("name");
            checkBoxObject.htmlElement = checkBoxElement;
            checkBoxObject.checkMark = checkBoxElement.children[0];
            checkBoxObject.checkMarkCircle = checkBoxElement.parentElement.children[0];

            if (hasEditIcon === true) {
                checkBoxObject.editIcon = checkBoxElement.parentElement.parentElement.children[1];
                checkBoxObject.hasEditIcon = true;
            }

            if (alphabet !== undefined) {
                checkBoxObject.alphabet = alphabet;
            }

            if (families !== undefined) {
                checkBoxObject.family = families[index];
                if (index < (elementList.length / 2)) {
                    checkBoxObject.alphabet = "hiragana";
                } else {
                    checkBoxObject.alphabet = "katakana"
                }
            }

            checkBoxObjectList.push(checkBoxObject);
        }

        this.initializeCheckboxList(checkBoxObjectList);

        return checkBoxObjectList;
    },

    // It checks the first checkbox and inserts the click event in everyone 
    initializeCheckboxList(checkBoxObjectList) {
        for (let index = 0; index < checkBoxObjectList.length; index++) {
            const checkBoxObject = checkBoxObjectList[index];
            const checkBoxElement = checkBoxObject.htmlElement;

            // It checks the first checkbox as default
            if (index === 0) {
                checkBoxObject.showCheckBoxAndCheckMark();
                checkBoxObject.showEditIcon();
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
    },

    checkBoxClickEventListener(checkBoxObject, checkBoxObjectList, index) {
        checkBoxObject.animateCheckBoxAndCheckMarkCircle();

        if (checkBoxList.canAnimate(checkBoxObjectList, index) === true) {

            if (checkBoxObject.isChecked === true) {
                checkBoxObject.isChecked = false;
                checkBoxObject.hideCheckBoxAndCheckMark();
                checkBoxObject.hideEditIcon();
            } else {
                checkBoxObject.isChecked = true;
                checkBoxObject.showCheckBoxAndCheckMark();
                checkBoxObject.showEditIcon();
            }

        } else {
            setTimeout(() => {
                alert("At least one option must be selected!");
            }, 300);
        }
    },

    async editIconClickEventListener(checkBoxObject) {
        await checkBoxObject.animateEditIcon();
        let title = checkBoxObject.name;
        modalCustomInterface.currentlyCheckBox = checkBoxObject;
        modalCustomInterface.show(title);
    }
}