let gameConfigurationModal = {
    htmlElement: document.querySelector(".game-configuration-modal"),

    firstShow: true,

    show() {
        if (this.firstShow === true) {

            $(document).ready(function () {
                $(".game-configuration-modal .time-container .game-time").mask("0:00");
                $(".game-configuration-modal .time-container .bonus-time").mask("00");
            });
        }

        let switchList = document.querySelectorAll(".game-configuration-modal .switch");
        for (let i = 0; i < switchList.length; i++) {
            let switchElement = switchList[i];
            switchElement.addEventListener("click", () => {
                if (switchElement.getAttribute("activated") === "true") {
                    switchElement.setAttribute("activated", false);
                    this.moveSwitchBallAnimation(switchElement, 0);
                    this.switchOpacityAnimation(switchElement, .6);

                } else {
                    switchElement.setAttribute("activated", true);
                    this.moveSwitchBallAnimation(switchElement, 50);
                    this.switchOpacityAnimation(switchElement, 1);
                }
            })
        }
    },

    hide() {

    },

    reset() {

    },

    moveSwitchBallAnimation(switchElement, margin) {
        const switchBall = switchElement.children[0];
        const animation = switchBall.animate([
            { marginLeft: margin + "%" }
        ], { duration: 500, easing: "ease" })

        animation.addEventListener("finish", () => {
            switchBall.style.marginLeft = margin + "%";
        })
    },

    switchOpacityAnimation(switchElement, opacity) {
        const animation = switchElement.animate([
            { opacity: opacity }
        ], { duration: 1000, easing: "ease" })

        animation.addEventListener("finish", () => {
            switchElement.style.opacity = opacity;
        })
    }
}