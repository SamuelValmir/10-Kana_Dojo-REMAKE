
class CheckBox {
    isChecked = false;
    isEdited = false;
    name;
    htmlElement;
    checkMark;
    checkMarkCircle;
    hasEditIcon = false;
    editIcon;
    alphabet;
    family;
    animateCheckBoxAndCheckMarkCircle() {
        this.htmlElement.animate([
            { transform: "scale(0.8)" }
        ], 200);

        this.checkMarkCircle.animate([
            { opacity: 1 },
            { transform: "scale(3.5)" }
        ], 200);
    }

    animateEditIcon() {
        let promise = new Promise((resolve) => {
            let editIconAnimation = this.editIcon.animate([
                { transform: "scale(.8)" }
            ], 150);

            editIconAnimation.addEventListener('finish', () => {
                resolve();
            })
        })

        return promise;
    }

    showCheckBoxAndCheckMark() {
        this.htmlElement.style.backgroundColor = MENU_PRIMARY_COLOR;
        this.htmlElement.style.borderColor = MENU_PRIMARY_COLOR;
        this.checkMark.style.display = "block"
    }

    hideCheckBoxAndCheckMark() {
        this.htmlElement.style.backgroundColor = "rgb(0, 0, 0, 0)";
        this.htmlElement.style.borderColor = "rgba(0, 0, 0, 0.6)";
        this.checkMark.style.display = "none"
    }

    showEditIcon() {
        if (this.hasEditIcon === true) {
            this.editIcon.style.display = "block";
        }
    }

    hideEditIcon() {
        if (this.hasEditIcon === true) {
            this.editIcon.style.display = "none";
        }
    }
}