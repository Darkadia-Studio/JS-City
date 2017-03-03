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
    template: require("./signup.component.html"),
    controller: SignupController
}