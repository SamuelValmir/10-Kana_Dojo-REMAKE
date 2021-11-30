class HeaderController {
    constructor(returnButtonHighlight, nav) {
        this.returnButtonHighlight = returnButtonHighlight;
        this.nav = nav;
    }

    animateButton() {
       const promise = returnButtonAnimation(this.returnButtonHighlight);
       return promise;
    }
}