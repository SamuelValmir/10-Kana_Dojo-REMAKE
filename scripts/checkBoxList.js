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
    
    getAllChecked(list){
        let checkBoxCheckedList = [];
        checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        return checkBoxCheckedList;
    },

    built(elementList, hasEditIcon = false, alphabet = undefined) {
        // Return an object list of check box that its first element is checked by default
        const objectList = [];
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

            if (alphabet !== undefined){
                checkBoxObject.alphabet = alphabet;
            }

            objectList.push(checkBoxObject);
        }
        return objectList;
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
                modalMainInterface.checkBoxClickEventListener(checkBoxObject, checkBoxObjectList, index);
            })

            // It adds click event in checkbox's edit icon
            if (checkBoxObject.hasEditIcon === true) {
                checkBoxObject.editIcon.addEventListener("click", () => {
                    modalMainInterface.editIconClickEventListener(checkBoxObject, checkBoxObjectList, index);
                })
            }
        }
    },
}