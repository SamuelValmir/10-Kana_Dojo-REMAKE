class NavModel {
    isLeftOptionSelected = true;
    isRightOptionSelected = false;

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
}