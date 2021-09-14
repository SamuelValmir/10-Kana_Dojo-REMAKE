let a = document.querySelector("nav .option-learn");
let b = document.querySelector("nav .option-play");

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor = "white";

    let options = document.querySelector("nav").children;
    for (const option of options) {
        option.addEventListener("click", changeNavOption);
    }

    a.style.borderBottom = "solid white";
})

function changeNavOption(event) {
    let option = event.target;
    if (option.dataset.selected == "false") {
        if (option.classList.contains("option-learn")) {
            a.classList.add("highlight");
            b.classList.remove("highlight");
            a.style.borderBottom = "solid white";
            b.style.borderBottom = "none";
            a.dataset.selected = true;
            b.dataset.selected = false;
            goToLearnMenu();
            
        } else if (option.classList.contains("option-play")) {
            b.classList.add("highlight");
            a.classList.remove("highlight");
            a.style.borderBottom = "none";
            b.style.borderBottom = "solid white";
            a.dataset.selected = false;
            b.dataset.selected = true;
            goToPlayMenu();
        }
    }
}

function goToPlayMenu() {
    console.log(123)
}

function goToLearnMenu() {

    console.log(443)
}