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

    build() {
        for (let i = 0; i < Object.entries(kana.groups).length; i++) {
            let kanaTypes = Object.entries(kana.groups);

            let kanaType = Object.values(kanaTypes[i][1]);

            for (let index = 0; index < kanaType.length; index++) {
                const family = kanaType[index];
                family.forEach((kana) => {

                    if (i === 0) {
                        this.basicFamilies = kanaTypes[i][1];
                        this.basic.push(kana);

                    } else if (i === 1) {
                        this.voicedFamilies = kanaTypes[i][1];
                        this.voiced.push(kana);

                    } else if (i === 2) {
                        this.combo1Families = kanaTypes[i][1];
                        this.combo1.push(kana);

                    } else if (i === 3) {
                        this.combo2Families = kanaTypes[i][1];
                        this.combo2.push(kana);
                    }
                })
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/kana.json")
        .then(response => response.json())
        .then(data => {
            kana.groups = data;
            kana.build();
        })
})
