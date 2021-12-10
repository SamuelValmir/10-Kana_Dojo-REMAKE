class StatsScreenModel {
    constructor() {
        //It's important to make just one instance of the "database"/local storage

        // localStorage.removeItem("canStoreJsonTasks")
        // localStorage.clear();

        let canStoreJsonTasks = localStorage.getItem("canStoreJsonTasks")

        if (canStoreJsonTasks === null || canStoreJsonTasks === undefined) {
            localStorage.setItem("rightList", [0, 0]);
            localStorage.setItem("wrongList", [0, 0]);
            localStorage.setItem("accuracyList", [0, 0]);

            localStorage.setItem("canStoreJsonTasks", false);

            console.log("Local storage defined")
        }

        this.rightList = localStorage.getItem("rightList");
        this.wrongList = localStorage.getItem("wrongList");
        this.accuracyList = localStorage.getItem("accuracyList");

        console.log(this.rightList);
        console.log(this.wrongList);
        console.log(this.accuracyList);
    }
}