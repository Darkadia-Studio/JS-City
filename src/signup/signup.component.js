class SignupController{
    constructor(UserService, MailService, $location, $rootScope) {
        this.UserService = UserService;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.MailService = MailService;
        this.user = {};
        this.user.username = null;
        this.user.email = null;
        this.user.password = null;
        form.username.hasError = false;
        form.username.error = "";
        form.email.hasError = false;
        form.email.error = "";
        form.password.hasError = false;
        form.password.error = "";
    }

    register(form, user) {
        if(user.username === undefined || user.username === null || user.username === ""){
            form.username.hasError = true;
            form.username.error = "Le pseudo est obligatoire";
        } else if(user.username.length<3){
            form.username.hasError = true;
            form.username.error = "Le pseudo doit avoir minimum 3 caractères";
        } else if(user.username.length>50){
            form.username.hasError = true;
            form.username.error = "Le pseudo doit avoir maximum 50 caractères";
        } else {
            form.username.hasError = false;
            form.username.error = "";
        }

        if(user.email === undefined || user.email === null || user.email === ""){
            form.email.hasError = true;
            form.email.error = "L'adresse email est obligatoire";
        } else if(form.email.$invalid){
            form.email.hasError = true;
            form.email.error = "Adresse email non valide";
        } else {
            form.email.hasError = false;
            form.email.error = "";
        }
        
        if(user.password === undefined || user.password === null || user.password === ""){
            form.password.hasError = true;
            form.password.error = "Le mot de passe est obligatoire";
        } else if(user.password.length<6){
            form.password.hasError = true;
            form.password.error = "Le mot de passe doit avoir minimum 6 caractères";
        } else if(user.password.length>50){
            form.password.hasError = true;
            form.password.error = "Le mot de passe doit avoir maximum 50 caractères";
        } else if(!this.passwordRegex(user.password)){
            form.password.hasError = true;
            form.password.error = "Le mot de passe est invalide, seul les lettres et les chiffres sont autorisé";
        } else {
            form.password.hasError = false;
            form.password.error = "";
        }

        form.$invalid = form.username.hasError || form.email.hasError || form.password.hasError;

        if (form.$invalid) return;
        this.dataLoading = true;
        this.user = angular.copy(user);
            this.UserService.create(this.user)
                .then(response => {
                    console.log("Réponse ", response);
                    if (response.success) {
                        this.hasMainError = false;
                        this.$location.path('/login');
                    } else {
                        this.dataLoading = false;
                        this.hasMainError = true;
                        switch(response.error){
                            case "error.exist.email":
                                this.mainError = response.message;
                                break;
                            case "error.exist.username":
                                break;
                        }
                        this.mainError = response.message;
                    }
                });
        }

        resetForm(form, user){
            form.$invalid = false;
            form.username.hasError = false;
            form.username.error = "";
            form.email.hasError = false;
            form.email.error = "";
            form.password.hasError = false;
            form.password.error = "";

            user.username = null;
            user.email = null;
            user.password = null;
            this.user.username = null;
            this.user.email = null;
            this.user.password = null;
            this.mainError = "";
            this.hasMainError = false;
        }

        mailRegex(mail){
            const regex = /[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+/;
            return regex.exec(mail);
        }

        passwordRegex(pass){
            const regex = /^((?=\S*?[a-zA-Z0-9]).{5,})\S$/;
            return regex.exec(pass);
        }
}

export const SignupComponent = {
    template: require("./signup.component.html"),
    controller: SignupController
}