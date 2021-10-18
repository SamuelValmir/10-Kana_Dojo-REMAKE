class HeaderController {
    constructor(returnButtonHighlight, nav) {
        this.returnButtonHighlight = returnButtonHighlight;
        this.nav = nav;
    }

    animateButton() {
        const promise = new Promise(resolve=>{

            this.returnButtonHighlight.style.display = "block";
            
            let animation = this.returnButtonHighlight.animate([
                {display: "block",
                transform: "scale(2)"}
            ], {duration: 300, easing: "ease"})
            
            animation.addEventListener("finish", ()=>{
                this.returnButtonHighlight.style.display = "none";
                resolve();
            })
        })

        return promise;
    }
}