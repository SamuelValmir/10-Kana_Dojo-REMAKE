let referenceScreenInterface = {
    htmlElement: document.querySelector(".reference-screen"),
    isShowing: false,
    firstShow: true,
    returnButton: {
        htmlElement: document.querySelector(".reference-screen .return-icon")
    },
    progressBar: document.querySelector(".reference-screen-progress-container"),
    progressBarTop: "",
    setProgressBarTop() {
        this.progressBarTop = this.progressBar.offsetTop;
    },

    navOptions: {
        htmlElement: document.querySelector(".reference-screen-nav").children,
        hiraganaOption: {
            htmlElement: document.querySelector(".hiragana-option"),
            isSelected: true,
            animate() {
                let katakanaOption = referenceScreenInterface.navOptions.katakanaOption;
                if (katakanaOption.isSelected === true && this.isSelected === false) {
                    this.isSelected = true;
                    katakanaOption.isSelected = false;

                    this.htmlElement.classList.add("highlight");
                    katakanaOption.htmlElement.classList.remove("highlight");

                    this.htmlElement.style.borderBottom = "5px solid white";
                    katakanaOption.htmlElement.style.borderBottom = "none";
                }
            }
        },
        katakanaOption: {
            htmlElement: document.querySelector(".katakana-option"),
            isSelected: false,
            animate() {
                let hiraganaOption = referenceScreenInterface.navOptions.hiraganaOption;
                if (hiraganaOption.isSelected === true && this.isSelected === false) {
                    this.isSelected = true;
                    hiraganaOption.isSelected = false;

                    this.htmlElement.classList.add("highlight");
                    hiraganaOption.htmlElement.classList.remove("highlight");

                    this.htmlElement.style.borderBottom = "5px solid white";
                    hiraganaOption.htmlElement.style.borderBottom = "none";

                }
            }
        }
    },

    show() {
        this.htmlElement.style.display = "block";
        this.initialize();
        this.isShowing = true;
        this.drawCards(HIRAGANA);
    },

    hide() {
        this.htmlElement.style.display = "none";
        this.isShowing = false;
    },

    drawCards(option) {
        let referenceScreenContainer = document.querySelector(".reference-screen .container");
        referenceScreenContainer.innerHTML = "";
        for (const group of Object.entries(kana.groups)) {
            let familyName = document.createElement("div");
            familyName.id = group[0];
            familyName.classList.add("family-name");
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

        hiraganaOption.isSelected = true;
        katakanaOption.isSelected = false;

        hiraganaOption.htmlElement.style.borderBottom = "5px solid white";
        katakanaOption.htmlElement.style.borderBottom = "none";

        hiraganaOption.htmlElement.classList.remove("highlight");
        katakanaOption.htmlElement.classList.remove("highlight");

        if (this.firstShow === true) {
            this.firstShow = false;

            hiraganaOption.htmlElement.addEventListener("click", () => {
                hiraganaOption.animate();
                referenceScreenInterface.drawCards(HIRAGANA);
            })

            katakanaOption.htmlElement.addEventListener("click", () => {
                katakanaOption.animate();
                referenceScreenInterface.drawCards(KATAKANA);
            })

            referenceScreenInterface.returnButton.htmlElement.addEventListener("click", () => {
                referenceScreenInterface.hide();
                menuScreenInterface.show();
            })
        }

        this.setProgressBarTop();
    },
}

// It fills the 3 scrolls bar as long as the screen is scrolled
window.onscroll = () => {
    if (referenceScreenInterface.isShowing) {

        let winScroll = document.documentElement.scrollTop;
        let voicedTop = document.querySelector("#voiced").offsetTop;
        let comboTop1 = document.querySelector("#combo1").offsetTop;
        let comboTop2 = document.querySelector("#combo2").offsetTop;
        let winHeight = document.documentElement.scrollHeight;

        let basicBarHeight = voicedTop - document.documentElement.clientHeight;
        let voicedBarHeight = comboTop1 - voicedTop;
        let comboBarHeight1 = comboTop2 - comboTop1;
        let comboBarHeight2 = winHeight - comboTop2;

        let basicScrolled = (winScroll / basicBarHeight) * 100;
        let voicedScrolled = ((winScroll - basicBarHeight) / voicedBarHeight) * 100;
        let comboScrolled1 = ((winScroll - voicedBarHeight - basicBarHeight) / comboBarHeight1) * 100;
        let comboScrolled2 = ((winScroll - comboBarHeight1 - voicedBarHeight - basicBarHeight) / comboBarHeight2) * 100;

        // This is to not overflow the value between 0 and 100
        if (basicScrolled < 0) {
            basicScrolled = 0;
        } else if (basicScrolled > 100) {
            basicScrolled = 100;
        }

        if (voicedScrolled < 0) {
            voicedScrolled = 0;
        } else if (voicedScrolled > 100) {
            voicedScrolled = 100;
        }

        if (comboScrolled1 < 0) {
            comboScrolled1 = 0;
        } else if (comboScrolled1 > 100) {
            comboScrolled1 = 100;
        }

        if (comboScrolled2 < 0) {
            comboScrolled2 = 0;
        } else if (comboScrolled2 > 100) {
            comboScrolled2 = 100;
        }

        document.querySelector("#basic-scroll").style.width = basicScrolled + "%";
        document.querySelector("#voiced-scroll").style.width = voicedScrolled + "%";
        document.querySelector("#combo-scroll1").style.width = comboScrolled1 + "%";
        document.querySelector("#combo-scroll2").style.width = comboScrolled2 + "%";
        pinOnTop();
    }
}

function pinOnTop() {
    // If the top of the screen overflow the progress bars'top
    if (window.pageYOffset >= referenceScreenInterface.progressBarTop) {
        referenceScreenInterface.progressBar.classList.add("pinOnTop");
        let progressContainerHeight = document.querySelector(".reference-screen-progress-container").offsetHeight;
        document.body.style.marginTop = progressContainerHeight + "px";
    } else {
        referenceScreenInterface.progressBar.classList.remove("pinOnTop");
        document.body.style.marginTop = "0";
    }
}