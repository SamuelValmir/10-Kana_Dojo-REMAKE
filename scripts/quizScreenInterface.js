let quizScreenInterface = {
    htmlElement: document.querySelector(".quiz-screen"),
    firstShow: true,
    inputText: document.querySelector(".quiz-screen .footer input"),
    text: document.querySelector('.quiz-screen .footer .text'),
    verticalLine: document.querySelector(".quiz-screen .vertical-line"),
    returnButton: document.querySelector(".quiz-screen .return-button"),
    returnButtonHighlight: document.querySelector(".quiz-screen .return-button-highlight"),

    show() {
        this.htmlElement.style.display = "flex";
        this.initialize();
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    initialize() {
        if (this.firstShow === true) {
            this.firstShow = false;
            
            console.log(this.returnButtonHighlight)
            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight, undefined);
            // this.headerController = HeaderControllerObject;    
    
            this.returnButton.addEventListener("click", async ()=>{
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
        }
    }
}