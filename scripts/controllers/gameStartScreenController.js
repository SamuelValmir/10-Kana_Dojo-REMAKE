class GameStartScreenController {
    constructor(playButton, hsl) {
        this.playButton = playButton;
        this.hsl = hsl;
    }

    animateButton() {
        const promise = new Promise(resolve => {
            const [hue, saturation, lightness] = this.hsl;

            const animation = this.playButton.animate([
                { backgroundColor: "hsl(" + hue + "," + saturation + "%," + (lightness + 15) + "%)" }
            ], { duration: 300, easing: "ease" })

            animation.addEventListener("finish", () => {
                resolve();
            })
        })

        return promise;
    }
}