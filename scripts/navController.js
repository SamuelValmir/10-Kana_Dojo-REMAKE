class NavController {
    constructor(leftOption, rightOption, leftScreen, rightScreen, containers, scrollBar) {
        this.leftOption = leftOption;
        this.rightOption = rightOption;
        this.leftScreen = leftScreen;
        this.rightScreen = rightScreen;
        this.containers = containers;
        this.scrollBar = scrollBar;

    }

    animateLeftOption() {
        this.leftOption.classList.add("highlight");
        this.rightOption.classList.remove("highlight");
        this.leftScreen.scrollIntoView();
    };

    animateRightOption() {
        this.rightOption.classList.add("highlight");
        this.leftOption.classList.remove("highlight");
        this.rightScreen.scrollIntoView();
    };

    scrollListener(navModel) {
        this.scrollBar.style.setProperty("margin-left", (this.containers.scrollLeft / 2) + "px");

        if (this.containers.scrollLeft < this.containers.scrollWidth / 4) {
            navModel.isLeftOptionSelected = true;
            navModel.isRightOptionSelected = false;

            this.rightOption.style.color = "rgba(255, 255, 255, .5)";
            this.leftOption.style.color = "white";
            this.leftOption.classList.remove("highlight");
        } else {
            navModel.isLeftOptionSelected = false;
            navModel.isRightOptionSelected = true;

            this.leftOption.style.color = "rgba(255, 255, 255, .5)";
            this.rightOption.style.color = "white";
            this.rightOption.classList.remove("highlight");
        }
    }
}