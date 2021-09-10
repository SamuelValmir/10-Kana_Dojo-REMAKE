let kanaJson;

window.onload = () => {
    fetch('./assets/kana.json')
        .then(response => response.json())
        .then(data => {
            kanaJson = data;
            createCards();
        })
        .then(startGame())
}

let createCards = () => {
    let cards = [];

    for (const family of Object.values(kanaJson)) {
        for (const kana of family) {
            cards.push(createPairOf(kana));
        }
    }
    cards = cards.flatMap(pair => pair);
    let a = [];
    for (let index = 0; index < 30; index++) {
        a.push(cards[index]);
        shuffle(a);
    }
    for (let i = 0; i < a.length; i++) {
        document.getElementsByClassName("board")[0].innerHTML +=
            "<div class='card' data-icon='bootstrap'>" +
            "   <div class='card-front'>" + a[i].content + "</div>" +
            "   <div class='card-back'>" + "" + "</div>" +
            "</div>";
    }
}

let createPairOf = (kana) => {
    return [
        { id: createId(kana), content: wanakana.toHiragana(kana), flipped: false },
        { id: createId(kana), content: wanakana.toHiragana(kana), flipped: false }
    ];
}

let createId = (kana) => {
    let num = Math.random() * 1000
    return kana + parseInt(num);
}

let startGame = () => {
}

let shuffle = (list) => {
    let currentIndex = list.length;
    let randomIndex = 0;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
    }
}