let statsScreenInterface = {
    htmlElement: document.querySelector(".stats-screen"),
    isShowing: false,
    firstShow: true,
    returnButton: document.querySelector(".stats-screen .return-button"),
    returnButtonHighlight: document.querySelector(".stats-screen .return-button-highlight"),

    progressBar: document.querySelector(".stats-screen .progress-container"),
    progressBarTop: "",
    setProgressBarTop() {
        this.progressBarTop = this.progressBar.offsetTop;
    },

    navOptions: {
        hiraganaOption: document.querySelector(".stats-screen .hiragana-option"),
        katakanaOption: document.querySelector(".stats-screen .katakana-option"),
        hiraganaOptionHighlight: document.querySelector(".stats-screen .hiragana-option .option-highlight"),
        katakanaOptionHighlight: document.querySelector(".stats-screen .katakana-option .option-highlight")
    },

    screens: {
        hiraganaScreen: document.querySelector(".stats-screen .hiragana-screen"),
        katakanaScreen: document.querySelector(".stats-screen .katakana-screen"),
    },
    containers: document.querySelector(".stats-screen .containers"),
    scrollBar: document.querySelector(".stats-screen .nav .scroll-bar"),

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
        let statsScreenContainer = containerScreen;
        // statsScreenContainer.innerHTML = "";
        console.log(kana.groups)
        for (const group of Object.entries(kana.groups)) {
            let familyName = document.createElement("div");
            familyName.classList.add("family-name");
            familyName.classList.add(group[0]);
            group[0][0].toUpperCase;
            familyName.innerHTML = capitalizeFirstLetter(group[0]);
            statsScreenContainer.appendChild(familyName);

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

                    statsScreenContainer.appendChild(familyElement);
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

        const NavModelObject = new NavModel;
        const NavControllerObject = new NavController(hiraganaOption, hiraganaOptionHighlight, katakanaOption, katakanaOptionHighlight, hiraganaScreen, katakanaScreen, this.containers, this.scrollBar, undefined);

        const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, NavControllerObject)

        if (this.firstShow === true) {
            this.firstShow = false;

            statsScreenInterface.drawCards(HIRAGANA, hiraganaScreen);
            statsScreenInterface.drawCards(KATAKANA, katakanaScreen);

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

            statsScreenInterface.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();
                statsScreenInterface.hide();
                menuScreenInterface.show();
            })

            this.containers.addEventListener("scroll", () => { HeaderControllerObject.nav.scrollListener(NavModelObject) })
        }

        this.setProgressBarTop();

        // // It fills the 3 scrolls bar as long as the screen is scrolled
        // window.onscroll = () => {
        //     console.log(123356)

        //     if (statsScreenInterface.isShowing) {

        //         let winScroll = document.documentElement.scrollTop;
        //         let voicedTop = document.querySelector(".stats-screen .voiced").offsetTop;
        //         let comboTop1 = document.querySelector(".stats-screen .combo1").offsetTop;
        //         let comboTop2 = document.querySelector(".stats-screen .combo2").offsetTop;
        //         let winHeight = document.documentElement.scrollHeight;

        //         let basicBarHeight = voicedTop - document.documentElement.clientHeight;
        //         let voicedBarHeight = comboTop1 - voicedTop;
        //         let comboBarHeight1 = comboTop2 - comboTop1;
        //         let comboBarHeight2 = winHeight - comboTop2;

        //         let basicScrolled = (winScroll / basicBarHeight) * 100;
        //         let voicedScrolled = ((winScroll - basicBarHeight) / voicedBarHeight) * 100;
        //         let comboScrolled1 = ((winScroll - voicedBarHeight - basicBarHeight) / comboBarHeight1) * 100;
        //         let comboScrolled2 = ((winScroll - comboBarHeight1 - voicedBarHeight - basicBarHeight) / comboBarHeight2) * 100;

        //         // This is to not overflow the value between 0 and 100
        //         if (basicScrolled < 0) {
        //             basicScrolled = 0;
        //         } else if (basicScrolled > 100) {
        //             basicScrolled = 100;
        //         }

        //         if (voicedScrolled < 0) {
        //             voicedScrolled = 0;
        //         } else if (voicedScrolled > 100) {
        //             voicedScrolled = 100;
        //         }

        //         if (comboScrolled1 < 0) {
        //             comboScrolled1 = 0;
        //         } else if (comboScrolled1 > 100) {
        //             comboScrolled1 = 100;
        //         }

        //         if (comboScrolled2 < 0) {
        //             comboScrolled2 = 0;
        //         } else if (comboScrolled2 > 100) {
        //             comboScrolled2 = 100;
        //         }

        //         document.querySelector(".stats-screen .basic-scroll").style.width = basicScrolled + "%";
        //         document.querySelector(".stats-screen .voiced-scroll").style.width = voicedScrolled + "%";
        //         document.querySelector(".stats-screen .combo-scroll1").style.width = comboScrolled1 + "%";
        //         document.querySelector(".stats-screen .combo-scroll2").style.width = comboScrolled2 + "%";
        //         pinOnTop();
        //     }
        // }
    },
}


function pinOnTop() {
    // If the top of the screen overflow the progress bars'top
    if (window.pageYOffset >= statsScreenInterface.progressBarTop) {
        statsScreenInterface.progressBar.classList.add("pinOnTop");
        let progressContainerHeight = document.querySelector(".stats-screen .progress-container").offsetHeight;
        document.body.style.marginTop = progressContainerHeight + "px";
    } else {
        statsScreenInterface.progressBar.classList.remove("pinOnTop");
        document.body.style.marginTop = "0";
    }
}