class GameController{
    constructor(JSCityService){
        this.JSCityService = JSCityService;
    }

    $onInit(){
    }
}

export const GameComponent = {

    template: require('./game.component.html'),
    controller: GameController,

}