export class JSCityService{
    constructor(){
        this.api = "http://localhost:3000/";
        this.buildingsApi = "buildings/";
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