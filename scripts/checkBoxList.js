let checkBoxList = {
    checkedAmount: null,
    canAnimate(list, selectedIndex) {
        this.setCheckedAmount(list);

        if (this.checkedAmount > 1) {
            return true;
        } else if (this.checkedAmount === 1 && list[selectedIndex].isChecked === false) {
            console.log(123)
            return true;
        }
        return false;
    },

    setCheckedAmount(list) {
        let checkBoxCheckedList = list.filter((checkBox) => checkBox.isChecked === true);
        // console.log(checkBoxCheckedList.length)
        this.checkedAmount = checkBoxCheckedList.length;
    },

    built(elementList) {
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
            objectList.push(checkBoxObject);
        }
        return objectList;
    }
}