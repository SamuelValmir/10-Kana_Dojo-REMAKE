let flashCardScreen = {
    htmlElement: document.querySelector(".flashCard-screen"),
    top: {
        htmlElement: document.querySelector(".flashCard-screen .top"),
        current: 1,
        total: 0,
        setTotal() {
            this.total = flashCardScreen.items.cards.length;
        }
    },
    items: {
        htmlElement: document.querySelector(".flashCard-screen .items"),

        cards: [],
        flashCard: {
            tag: "div",
            class: "flashCard",

            front: {
                tag: "div",
                class: "flashCard-front",
                text: "",
            },
            back: {
                tag: "div",
                class: "flashCard-back",
                text: ""
            },

        },

        setCards(cards) {
            this.cards = cards;
        },

        buildCards() {
            let top = flashCardScreen.top;
            top.setTotal();
            top.htmlElement.innerHTML = top.current + " / " + top.total;

            let items = this.htmlElement;
            this.cards.forEach(kana => {
                let card = this.flashCard;
                let front = this.flashCard.front;
                front.text = kana;

                let back = this.flashCard.back;
                back.text = wanakana.toRomaji(kana);

                let cardElement = document.createElement(card.tag);
                cardElement.classList.add(card.class);

                let backCardElement = document.createElement(back.tag);
                backCardElement.classList.add(back.class);
                backCardElement.innerHTML = back.text;

                let frontCardElement = document.createElement(front.tag);
                frontCardElement.classList.add(front.class);
                frontCardElement.innerHTML = front.text;

                a.push(cardElement);
                items.appendChild(cardElement);
                cardElement.appendChild(backCardElement);
                cardElement.appendChild(frontCardElement);

                cardElement.addEventListener("click", () => {
                    cardElement.classList.toggle("flip");
                });

            });
        }
    },

    setItemsEventListener: function () {
        let items = this.items.htmlElement
        items.addEventListener("wheel", event => {
            // If the mouse has been scrolled down...
            // console.log(event.target)
            if (event.deltaY > 0) {
                items.scrollBy(500, 0)
            } else {
                items.scrollBy(-500, 0)
            }
        })
    },

    show() {
        this.htmlElement.style.display = "grid";
    },

    hide() {
        this.htmlElement.style.display = "none";
    },

    drawCardsOnScreen() {

    },
}

// console.log(flashCardScreen.flashCard.cards)
