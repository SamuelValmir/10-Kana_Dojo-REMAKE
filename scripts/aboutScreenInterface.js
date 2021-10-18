let aboutScreenInterface = {
    HTMLElement: document.querySelector(".about-screen"),
    firstShow: true,
    returnButton: document.querySelector(".about-screen .return-icon"),
    returnButtonHighlight: document.querySelector(".about-screen .return-icon-highlight"),

    show() {
        this.HTMLElement.style.display = "block";
        this.initialize();
    },

    hide() {
        this.HTMLElement.style.display = "none";
    },

    initialize(){
        if (this.firstShow === true){
            this.firstShow = false;

            const HeaderControllerObject = new HeaderController(this.returnButtonHighlight);

            this.returnButton.addEventListener("click", async ()=>{
                await HeaderControllerObject.animateButton();
                this.hide();
                menuScreenInterface.show();
            })
        }
    }
}