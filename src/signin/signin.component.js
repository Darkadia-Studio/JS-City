class SigninController{
    constructor(UserService, $location, $rootScope){
        this.UserService = UserService;
        this.$location = $location;
        this.$rootScope = $rootScope
    }

    $onInit() {
        this.message = '';
    }

    authenticate(form, user){
        if(form.$invalid) return;
        this.UserService.connect(user)
            .then(user=> {
                if(!user) {
                    this.message = "Email ou Mot de passe incorrect"
                } else {
                    this.$rootScope.$emit("userAuth", user)
                    this.$location.path('/')
                }
            });
    }
}

export const SigninComponent = {
    template: require("./signin.component.html"),
    controller: SigninController
}