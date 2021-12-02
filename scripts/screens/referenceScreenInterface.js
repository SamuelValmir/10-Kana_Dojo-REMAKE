let referenceScreenInterface = {
    htmlElement: document.querySelector(".reference-screen"),
    display: "block",
    isShowing: false,
    firstShow: true,
    returnButton: document.querySelector(".reference-screen .return-button"),
    returnButtonHighlight: document.querySelector(".reference-screen .return-button-highlight"),

    progressBar: document.querySelector(".reference-screen .progress-container"),
    progressBarTop: "",
    setProgressBarTop() {
        this.progressBarTop = this.progressBar.offsetTop;
    },

    navOptions: {
        hiraganaOption: document.querySelector(".reference-screen .hiragana-option"),
        katakanaOption: document.querySelector(".reference-screen .katakana-option"),
        hiraganaOptionHighlight: document.querySelector(".reference-screen .hiragana-option .option-highlight"),
        katakanaOptionHighlight: document.querySelector(".reference-screen .katakana-option .option-highlight")
    },

    screens: {
        hiraganaScreen: document.querySelector(".reference-screen .hiragana-screen"),
        katakanaScreen: document.querySelector(".reference-screen .katakana-screen"),
    },
    containers: document.querySelector(".reference-screen .containers"),
    scrollBar: document.querySelector(".reference-screen .nav .scroll-bar"),

    show() {
        this.htmlElement.style.display = "block";
        this.initialize();
        this.isShowing = true;
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;
    },

    drawCards(option, containerScreen) {
        let referenceScreenContainer = containerScreen;
        referenceScreenContainer.innerHTML = "";
        for (const group of Object.entries(kana.groups)) {
            let familyName = document.createElement("div");
            familyName.classList.add("family-name");
            familyName.classList.add(group[0]);
            group[0][0].toUpperCase;
            familyName.innerHTML = capitalizeFirstLetter(group[0]);
            referenceScreenContainer.appendChild(familyName);

            for (const family of Object.values(group[1])) {
                let familyElement = document.createElement("div");
                familyElement.classList.add("family");
                for (let kana of family) {
                    let cardElement = document.createElement("div");
                    cardElement.classList.add("card");

                    let cardTop = document.createElement("span");
                    cardTop.classList.add("top");

                    if (option === "hiragana") {
                        cardTop.innerHTML = wanakana.toHiragana(kana);
                    } else if (option === "katakana") {
                        cardTop.innerHTML = wanakana.toKatakana(kana);
                    }

                    let cardBottom = document.createElement("span");
                    cardBottom.classList.add("bottom");
                    if (kana === "du") {
                        kana = "dzu";
                    }
                    cardBottom.innerHTML = kana;

                    referenceScreenContainer.appendChild(familyElement);
                    familyElement.appendChild(cardElement);
                    cardElement.appendChild(cardTop);
                    cardElement.appendChild(cardBottom);
                }
                if (familyElement.childElementCount == 2 || familyElement.childElementCount == 3) {
                    familyElement.style.justifyContent = "space-between";
                }
            }
        }
    },

    initialize() {
        let hiraganaOption = this.navOptions.hiraganaOption;
        let katakanaOption = this.navOptions.katakanaOption;
        let hiraganaOptionHighlight = this.navOptions.hiraganaOptionHighlight;
        let katakanaOptionHighlight = this.navOptions.katakanaOptionHighlight;

        let hiraganaScreen = this.screens.hiraganaScreen;
        let katakanaScreen = this.screens.katakanaScreen;

        const NavModelObject = new NavModel("left");
        const NavControllerObject = new NavController(hiraganaOption, hiraganaOptionHighlight, katakanaOption, katakanaOptionHighlight, "left", hiraganaScreen, katakanaScreen, this.containers, this.scrollBar, undefined);

        const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, NavControllerObject)

        if (this.firstShow === true) {
            this.firstShow = false;

            referenceScreenInterface.drawCards(HIRAGANA, hiraganaScreen);
            referenceScreenInterface.drawCards(KATAKANA, katakanaScreen);

            hiraganaOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateLeftOption() === true) {
                    HeaderControllerObject.nav.animateLeftOption();
                }
            })

            katakanaOption.addEventListener("click", () => {
                if (NavModelObject.canAnimateRightOption() === true) {
                    HeaderControllerObject.nav.animateRightOption();
                }
            })

            referenceScreenInterface.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();

                let firstScreen = this;
                let secondScreen = menuScreenInterface;
                screensTransitions.transition_1(firstScreen, secondScreen);
                menuScreenInterface.show();
            })

            this.containers.addEventListener("scroll", () => { HeaderControllerObject.nav.scrollListener(NavModelObject) })
        }

        this.setProgressBarTop();

    },
}

