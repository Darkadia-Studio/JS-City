export class UserService{
    constructor($http){
        this.$http = $http;
        this.api = "http://localhost:3000/";
        this.userApi = "users/";
        this.crypto = require('crypto');
    }

    getUsers(){
        let uri = this.api + this.userApi;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    getUserByid(id){
        let uri = this.api + this.userApi+id;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    getUserByName(username){
        let uri = this.api + this.userApi+"?username="+username;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    getUserByMail(mail){
        let uri = this.api + this.userApi+"?email="+mail;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    create(user){
        let uri = this.api + this.userApi;
        let response = {};
        user.scores = [];

        return this.getUsers().then(data => {
            return data.filter(data => {
            return data.username.toLowerCase() === user.username.toLowerCase() || data.email.toLowerCase() === user.email.toLowerCase();
        });
    }).then(data => {
                if (data.length>0) {
                    if(data[0].username.toLowerCase() === user.username.toLowerCase()){
                        response = { success: false, error:"error.exist.username", message: 'Le pseudo "' + user.username + '" est déjà pris' };
                    } else if(data[0].email.toLowerCase() === user.email.toLowerCase()){
                        response = { success: false, error:"error.exist.email", message: 'L\'adresse email "' + user.email + '" est déjà utilisé' };
                    } else {
                        response = { success: false, error:"error.unknow", message: 'Une erreur inconnue est survenue' };
                    }
                    console.log("Erreur");
                } else {
                    console.log("Sucess");
                    var pass = this.crypto.createHash('sha512').update(user.password).digest('hex');
                    user.password = pass;
                    this.$http.post(uri, user)
                        .then(response =>  response.data);
                    response = { success: true};
                }
        }).then(() => {
                return Promise.resolve(response);
            });

        return this.getUserByName(user.username)
            .then(data => {
                //console.log("User ",user);
                if (data.length>0) {
                    console.log("Erreur");
                    response = { success: false, error:"exist.username", message: 'Le pseudo "' + user.username + '" est déjà pris' };
                } else {
                    console.log("Sucess");
                    var pass = crypto.createHash('sha512').update(user.password).digest('hex');
                    user.password = pass;
                    this.$http.post(uri, user)
                        .then(response =>  response.data);
                    response = { success: true};
                }
            }).then(() => {
                return Promise.resolve(response);
            });
    }

    update(user){
        let uri = this.api + this.userApi+user.id;
        return this.$http.patch(uri, user)
            .then(response =>  response.data);
    }

    connect(user) {
       return this.$http.post(`${ this.api+this.userApi }signin`, user)
            .then(response => {
                let user = response.data
                if(!response.data) {
                    return null;
                } else {
                    let userAuthConcat = {
                        id: user.id,
                        username: user.username
                    }
                    localStorage.userAuth = angular.toJson(userAuthConcat)
                    return userAuthConcat
                }
            })
    }
}