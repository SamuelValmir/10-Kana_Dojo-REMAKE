// class Header{
//     constructor(reference, title, hasReturnIcon, hasMenuIcon, navClass, option1, option1Class, option2, option2Class){
//         this.reference = reference;
//         this.title = title;
//         this.hasReturnIcon = hasReturnIcon;
//         this.hasMenuIcon = hasMenuIcon;
//         this.navClass = navClass;
//         this.option1 = option1;
//         this.option1Class = option1Class;
//         this.option2 = option2;
//         this;option2Class = option2Class;
//     }
//     htmlElement =    "<div class='header'>" +
//     "    <div class='top'>" +
//     "        <div class='title'>" + this.title + "</div>" +
//     "        <span class='menu-icon'> &hellip; </span>" +
//     "    </div>" +

//     "    <nav class='menu-screen-nav'>" +
//     "        <div class='nav-option left-option learn-option' data-selected='true'>LEARN</div>" +
//     "        <div class='nav-option right-option play-option' data-selected='false'>PLAY</div>" +
//     "    </nav>";

//     returnIcon;
//     menuIcon;
//     build() {
//         let headerElement = document.createElement("div");
//         headerElement.classList.add("header");

//         let topElement = document.createElement("div");
//         topElement.classList.add("top");

//         let titleElement = document.createElement("span");
//         titleElement.classList.add("title");

//         if (this.hasMenuIcon === true){
//             let menuIcon = document.createElement("span");
//             menuIcon.classList.add("menu-icon");
//             menuIcon.innerHTML = "&hellip;"
//         }

//         let navElement = document.createElement("nav");
//         navElement.classList.add(this.navClass);

//         let navOption1Element = document.createElement("span");
//         navOption1Element.classList.add("nav-option left-option " + this.option1Class);
//         navOption1Element.dataset.selected = "true";
//         navOption1Element.innerHTML = this.option1;
        
//         let navOption2Element = document.createElement("span");
//         navOption2Element.classList.add("nav-option right-option " + this.option2Class);
//         navOption2Element.dataset.selected = "true";
//         navOption2Element.innerHTML = this.option1;

//         this.reference.appendChild(headerElement);
//         headerElement.appendChild(topElement);
//         topElement.appendChild(titleElement);
//         topElement.appendChild(this.menuIcon);
//         headerElement.appendChild(navElement);
//         headerElement.appendChild();
//     };
// }