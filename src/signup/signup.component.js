class SignupController{
    constructor(JSCityService){
        this.JSCityService = JSCityService;
    }

    signup(){

    }
}

export const SignupComponent = {

    template: require('./signup.component.html'),
    controller: SignupController,

}