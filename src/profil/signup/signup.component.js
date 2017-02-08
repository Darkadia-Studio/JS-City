class SignupController{
    constructor(JSCityService, UserService, $location){
        this.JSCityService = JSCityService;
        this.UserService = UserService;
        this.dataLoading = false;
        this.$location = $location;
    }

    register() {
            this.dataLoading = true;
            this.UserService.create(this.user)
                .then(response => {
                    console.log("Réponse ", response);
                    if (response.success) {
                        this.$location.path('/login');
                    } else {
                        this.dataLoading = false;
                    }
                });
        }
}

export const SignupComponent = {

    template: require('./signup.component.html'),
    controller: SignupController

}