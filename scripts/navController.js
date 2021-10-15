class NavController {
    constructor(leftOption, rightOption, leftScreen, rightScreen, containers, scrollBar, menuButton) {
        this.leftOption = leftOption;
        this.rightOption = rightOption;
        this.leftScreen = leftScreen;
        this.rightScreen = rightScreen;
        this.containers = containers;
        this.scrollBar = scrollBar;
        this.menuButton = menuButton;
    }

    animateLeftOption() {
        this.leftOption.classList.add("highlight");
        this.rightOption.classList.remove("highlight");
        this.containers.scrollTo(0, 0);
    };

    animateRightOption() {
        this.rightOption.classList.add("highlight");
        this.leftOption.classList.remove("highlight");
        this.containers.scrollBy((this.containers.scrollWidth / 2), 0);
    };

    animateMenuButton() {
        const promise = new Promise(resolve => {
            let aboutElement = this.menuButton.children[1];

            aboutElement.style.opacity = "1";
            aboutElement.style.display = "flex";
            let animation = aboutElement.animate([
                { width: "700%" }
            ], { duration: 300, easing: "ease-out" });

            animation.addEventListener("finish", () => {
                aboutElement.style.width = "700%";
                aboutElement.style.opacity = "1";
                aboutElement.style.display = "flex";
                resolve();
            })
        })

        return promise;
    }

    tryCloseMenuContent(elementCLiked) {
        if (elementCLiked.classList.contains("about") || elementCLiked.classList.contains("about-text") || elementCLiked.classList.contains("menu-button")) {
            this.animateMenuContent();
        } else {
            let aboutElement = this.menuButton.children[1];

            let animation = aboutElement.animate([
                { opacity: "0" }
            ], { duration: 300, easing: "ease-out" });

            animation.addEventListener("finish", () => {
                aboutElement.style.opacity = "0";
                aboutElement.style.display = "none";
                aboutElement.style.width = "300%";
            })
        }
    }

    animateMenuContent() {
        const promise = new Promise(resolve => {
            const aboutHighlight = document.querySelector(".about-highlight");

            aboutHighlight.style.display = "block";
            const animation = aboutHighlight.animate([
                {
                    display: "block",
                    width: "100%",
                    borderRadius: "inherit"
                }], { duration: 300, easing: "ease-out" })

            animation.addEventListener("finish", () => {
                aboutHighlight.style.display = "none";
                resolve();
            })
        })

        return promise;
    }

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