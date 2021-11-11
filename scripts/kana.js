let kana = {
    groups: [],
    basicFamilies: [],
    voicedFamilies: [],
    combo1Families: [],
    combo2Families: [],
    basic: [],
    voiced: [],
    combo1: [],
    combo2: [],

    initialize() {
        for (let i = 0; i < Object.entries(kana.groups).length; i++) {
            let kanaTypes = Object.entries(kana.groups);

            let kanaType = Object.values(kanaTypes[i][1]);

            for (let index = 0; index < kanaType.length; index++) {
                const family = kanaType[index];
                family.forEach((kana) => {

                    switch (i) {
                        case 0:
                            this.basicFamilies = kanaTypes[i][1];
                            this.basic.push(kana);
                            break;
                        case 1:
                            this.voicedFamilies = kanaTypes[i][1];
                            this.voiced.push(kana);
                            break;

                        case 2:
                            this.combo1Families = kanaTypes[i][1];
                            this.combo1.push(kana);
                            break;

                        case 3:
                            this.combo2Families = kanaTypes[i][1];
                            this.combo2.push(kana);
                            break;

                        default:
                            break;
                    }
                })
            }
        }
    },

    onlyRomajiOf(group) {
        let result = [];
        group.map((kana) => result.push(kana));
        return result;
    },

    toHiragana(list) {
        let result = [];
        list.forEach(kana => { result.push(wanakana.toHiragana(kana)) });
        return result;
    },

    toKatakana(list) {
        let result = [];
        list.forEach(kana => { result.push(wanakana.toKatakana(kana)) });
        return result;
    },

    getAll() {
        let result = [
            [...this.basic],
            [...this.voiced],
            [...this.combo1],
            [...this.combo2]]
        result = result.flat();
        return result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/kana.json")
        .then(response => response.json())
        .then(data => {
            kana.groups = data;
            kana.initialize();
            // new MatchMakerScreenInterface().showStartScreen();
            new EyeSpyScreenInterface().showStartScreen();
        })
})
