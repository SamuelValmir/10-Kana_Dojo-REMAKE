class NavModel {
    constructor(optionSelected){
        if (optionSelected === "left"){
            this.isLeftOptionSelected = true;
            this.isRightOptionSelected = false;
        } else if (optionSelected === "right"){
            this.isLeftOptionSelected = false;
            this.isRightOptionSelected = true;
        }
    }

    canAnimateLeftOption(){
        if (this.isLeftOptionSelected === false){
            this.isLeftOptionSelected = true;
            this.isRightOptionSelected = false;
            return true;
        }
        
        return false;
    }
    
    canAnimateRightOption(){
        if (this.isRightOptionSelected === false){
            this.isRightOptionSelected = true;
            this.isLeftOptionSelected = false;
            return true;
        }

        return false;
    }
    menuContentIsShowing = false;
}