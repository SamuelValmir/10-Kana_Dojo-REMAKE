let quizScreenInterface = {
    htmlElement: document.querySelector(".quiz-screen"),
    firstShow: true,
    inputText: document.querySelector(".quiz-screen .footer input"),
    text: document.querySelector('.quiz-screen .footer .text'),
    verticalLine: document.querySelector(".quiz-screen .vertical-line"),
    returnButton: document.querySelector(".quiz-screen .return-button"),
    returnButtonHighlight: document.querySelector(".quiz-screen .return-button-highlight"),

    wrongCounter: document.querySelector(".quiz-screen .wrong-counter"),
    cardsCounter: document.querySelector(".quiz-screen .cards-counter"),
    rightCounter: document.querySelector(".quiz-screen .right-counter"),

    card: document.querySelector(".quiz-screen .card"),

    quizScreenModelObject: undefined,

    show(cards) {
        this.htmlElement.style.display = "flex";
        this.initialize(cards);
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize(cards) {
        if (this.firstShow === true) {
            this.firstShow = false;

            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, undefined);
            // this.headerController = HeaderControllerObject;    

            this.quizScreenModelObject = new QuizScreenModel(cards)

            this.returnButton.addEventListener("click", async () => {
                await HeaderControllerObject.animateButton();
                this.hide();
                menuScreenInterface.show();
            })

            this.inputText.addEventListener("input", () => {
                this.text.innerHTML = this.inputText.value;

                if (this.inputText.value.length === 0) {
                    this.verticalLine.style.display = "block";
                } else {
                    this.verticalLine.style.display = "none"
                }
            })

            this.inputText.addEventListener("keypress", event => {
                if (event.key === "Enter" || event.keyCode === "13") {
                    this.nextCard();
                }
            })

            this.inputText.focus();
            this.setCurrentCard();
            this.updateCardsCounter();
            this.showCardAnimation();
        }
    },

    updateWrongCounter() {
        this.wrongCounter.innerHTML = this.quizScreenModelObject.wrongCounter;
    },

    updateRightCounter() {
        this.rightCounter.innerHTML = this.quizScreenModelObject.rightCounter;
    },

    updateCardsCounter() {
        const currentPosition = this.quizScreenModelObject.currentPosition;
        const cardsLength = this.quizScreenModelObject.cards.length;
        this.cardsCounter.innerHTML = currentPosition + " / " + cardsLength;
    },

    setCurrentCard() {
        this.card.innerHTML = this.quizScreenModelObject.currentCard;
    },

    hideCardAnimation() {
        const promise = new Promise(resolve=>{

            let animation = this.card.animate([
                { transform: "scale(.5)" }
            ], { duration: 300, easing: "linear" })

            animation.addEventListener("finish", ()=>{
                resolve();
            })
        })

        return promise;
    },

    showCardAnimation() {
        // console.log("animation")
        this.card.style.transform = "scale(1.5)";
        let animation = this.card.animate([
            { transform: "scale(1)" }
        ], { duration: 200, easing: "linear" })

        animation.addEventListener("finish", () => {
            this.card.style.transform = "scale(1)";
        })

        this.card.style.color = "#555";
    },

     showRightAnswer(){
        const promise = new Promise(resolve=>{
            this.text.innerHTML = wanakana.toRomaji(this.card.innerHTML);

            let animation = this.text.animate([
                {background: "rgb(230, 230, 0)"},
            ], { duration: 1250, easing: "ease-out"})

            animation.addEventListener("finish", ()=>{
                resolve();
            })
        })

        return promise;
    },

    wrongAnimation(){
        const promise = new Promise(resolve=>{
            let animation = this.card.animate([
                { transform: "translate(1rem, 0)"},
                { transform: "translate(-1rem, 0)"},
                { transform: "translate(1rem, 0)"},
                { transform: "translate(-1rem, 0)"},
                { transform: "translate(1rem, 0)"},
                { transform: "translate(-1rem, 0)"},
                { transform: "translate(1rem, 0)"},
                { transform: "translate(-1rem, 0)"},
                { transform: "translate(0, 0)"},
                { transform: "translate(0, 0)"},
                { transform: "translate(0, 0)"},
                { transform: "translate(0, 0)"},
                { transform: "translate(0, 0)"},
                { transform: "translate(0, 0)"},
         
            ], { duration: 700, easing: "cubic-bezier(.7, 0, 0.3 , 1)"})

            animation.addEventListener("finish", ()=>{
                resolve();
            })
        })

        return promise;
    },

    rightAnimation(){
        const promise = new Promise(resolve=>{
            let animation = this.card.animate([
                { transform: "scale(1)"},
                { transform: "scale(1.4)"},
                { transform: "scale(1)"},
            ], { duration: 600, easing: "cubic-bezier(.40, 1, 0.15, 1)"})

            animation.addEventListener("finish", ()=>{
                resolve();
            })
        })

        return promise;
    },

    makeCardGreen(){
        this.card.style.color = "#00CA00";
    },
    
    makeCardRed(){
        this.card.style.color = getComputedStyle(document.documentElement).getPropertyValue("--primaryColor");
    },

    async nextCard() {
        if (this.quizScreenModelObject.checkAnswer(this.inputText.value) === true) {
            this.updateRightCounter();
            this.makeCardGreen();
            await this.rightAnimation();
        } else {
            this.makeCardRed();
            this.updateWrongCounter();
            await this.wrongAnimation();
            await this.showRightAnswer();
        }
        
        await this.hideCardAnimation();
        this.showCardAnimation();
        this.setCurrentCard();
        this.updateCardsCounter();
        this.inputText.value = '';
        this.text.innerHTML = '';
        this.inputText.focus();
        this.verticalLine.style.display = "block";
    }

}