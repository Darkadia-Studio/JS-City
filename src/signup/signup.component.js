class SignupController{
    constructor(UserService, MailService, $location, $rootScope) {
        this.UserService = UserService;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.MailService = MailService;
    }

    saveUser(form, user) {
        if (form.$invalid) return;
        this.user = angular.copy(user);
        this.UserService.create(this.user);
        //this.authentification(this.user);
    }
}

export const SignupComponent = {
    template: require("./signup.component.html"),
    controller: SignupController
}