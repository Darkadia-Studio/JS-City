export class JSCityService{
    constructor(){
        this.api = "http://localhost:3000/";
        this.userApi = "users/";
        this.buildingsApi = "buildings/";
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

    signupUser(user){
        let uri = this.api + this.userApi;
        return this.$http.post(uri, user)
            .then(response =>  response.data);
    }

    updateUser(user){
        let uri = this.api + this.userApi+user.id;
        return this.$http.patch(uri, user)
            .then(response =>  response.data);
    }

    getBuildings(){
        let uri = this.api + this.buildingsApi;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    getBuilding(id){
        let uri = this.api + this.buildingsApi+id;
        return this.$http.get(uri)
            .then(response =>  response.data);
    }

    saveBuilding(building){
        let uri = this.api + this.buildingsApi;
        return this.$http.post(uri, building)
            .then(response =>  response.data);
    }

    updateBuilding(building){
        let uri = this.api + this.buildingsApi+building.id;
        return this.$http.patch(uri, building)
            .then(response =>  response.data);
    }
}