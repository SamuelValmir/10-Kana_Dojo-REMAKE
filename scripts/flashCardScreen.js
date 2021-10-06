"use strict";
let flashCardScreen = {
    htmlElement: document.querySelector(".flashCard-screen"),
    top: {
        htmlElement: document.querySelector(".flashCard-screen .top"),
        returnButton:{
            htmlElement: document.querySelector(".flashCard-screen .top .return-icon"),
            addEventListener(){
                this.htmlElement.addEventListener("click", ()=>{
                    flashCardScreen.hide();
                })
            }
        },
        text: {
            htmlElement: document.querySelector(".flashCard-screen .top .text"),
            current: 1,
            total: 0,
            setTotal() {
                this.total = flashCardScreen.items.cards.length;
            },
            setText() {
                this.htmlElement.innerHTML = this.current + " / " + this.total;
            }
        },
    },

    items: {
        htmlElement: document.querySelector(".flashCard-screen .items"),

        cards: [],

        flashCardList: [],
        flashCard: {
            tag: "div",
            class: "flashCard",
            width: "",

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
            let topText = flashCardScreen.top.text;
            topText.setTotal();
            topText.setText();


            let items = this.htmlElement;
            this.cards.forEach(kana => {
                let card = this.flashCard;
                let flashCardList = this.flashCardList;
                let front = this.flashCard.front;
                front.text = kana;

                let back = this.flashCard.back;
                back.text = wanakana.toRomaji(kana);

                let cardElement = document.createElement(card.tag);
                cardElement.classList.add(card.class);
                flashCardList.push(cardElement);

                let backCardElement = document.createElement(back.tag);
                backCardElement.classList.add(back.class);
                backCardElement.innerHTML = back.text;

                let frontCardElement = document.createElement(front.tag);
                frontCardElement.classList.add(front.class);
                frontCardElement.innerHTML = front.text;

                items.appendChild(cardElement);
                cardElement.appendChild(backCardElement);
                cardElement.appendChild(frontCardElement);

                cardElement.addEventListener("click", () => {
                    cardElement.classList.toggle("flip");
                });
            });

            items.addEventListener("scroll", () => {
                let spaceBetweenCards;
                let spotsToChangeCounter = [0];
                let cardWidth;

                // It defines the 'spaceBetweenCards', 'spotsToChangeCounter' and 'cardWidth' variables
                for (let i = 0; i < this.flashCardList.length; i++) {
                    let card = this.flashCardList[i];
                    cardWidth = card.offsetWidth;

                    if (i === 0) {
                        spaceBetweenCards = card.offsetLeft;
                    }

                    if (i < this.flashCardList.length - 1) {
                        let cardOffsetRight = card.offsetLeft + card.offsetWidth;
                        spotsToChangeCounter.push(cardOffsetRight);
                    }
                }

                // It changes the text of the index in the top of the screen according to position of the items's scroll 
                spotsToChangeCounter.forEach((spot) => {
                    if (items.scrollLeft >= spot - (cardWidth / 2) && items.scrollLeft <= spot + (cardWidth / 2)) {
                        let indexOfCurrent = spotsToChangeCounter.findIndex((element) => element === spot) + 1;
                        topText.current = indexOfCurrent;
                    }
                    topText.setText();
                })
            })
        },
    },

    setItemsEventListener: function () {
        let items = this.items.htmlElement
        items.addEventListener("wheel", event => {
            // If the mouse has been scrolled down...
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
    }
}

flashCardScreen.top.returnButton.addEventListener();
// console.log(flashCardScreen.flashCard.cards)
