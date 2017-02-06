export class UserService{
    constructor($http){
        this.$http = $http;
        this.api = "http://localhost:3000/";
        this.userApi = "users/";
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
        return this.getUserByName(user.username)
            .then(data => {
                //console.log("User ",user);
                if (data.length>0) {
                    response = { success: false, message: 'Username "' + user.username + '" is already taken' };
                } else {
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
       return this.$http.post(`${ api }/signin`, user)
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