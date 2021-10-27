class ModalController {
    constructor(leftButton, rightButton) {
        this.leftButton = leftButton;
        this.rightButton = rightButton;
    }

    animateButton(button) {
        let promise = new Promise(resolve => {
            let animation = button.animate([
                { backgroundColor: "#ddd" },
                { backgroundColor: "var(--white)" },
            ], 300);

            animation.addEventListener('finish', () => {
                resolve();
            })
        })
        return promise;
    };

    animateLeftButton() {
        return this.animateButton(this.leftButton);
    }

    animateRightButton() {
        return this.animateButton(this.rightButton);
    }

}