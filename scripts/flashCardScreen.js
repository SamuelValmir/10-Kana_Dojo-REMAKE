let flashCardScreen = {
    htmlElement: document.querySelector(".flashCard-screen"),
    top: {
        htmlElement: document.querySelector(".flashCard-screen .top"),
        current: 1,
        total: 0,
        setTotal (){
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

            this.cards.forEach(kana => {
                let card = this.flashCard;
                let front = this.flashCard.front;
                front.text = wanakana.toRomaji(kana);

                let back = this.flashCard.back;
                back.text = kana;

                let flashCardElement = document.createElement(card.tag);
                flashCardElement.classList.add(card.class);

                let frontCardElement = document.createElement(front.tag);
                frontCardElement.classList.add(front.class);
                frontCardElement.innerHTML = front.text;
                
                let backCardElement = document.createElement(back.tag);
                backCardElement.classList.add(back.class);
                backCardElement.innerHTML = back.text;


                this.htmlElement.appendChild(flashCardElement);
                flashCardElement.appendChild(frontCardElement);
                flashCardElement.appendChild(backCardElement);
            });
        }
    },

    setItemsEventListener: function () {
        this.items.htmlElement.addEventListener("wheel", event => {
            // If the mouse has been scrolled down...
            if (event.deltaY > 0) {
                event.target.scrollBy(500, 0)
            } else {
                event.target.scrollBy(-500, 0)
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
