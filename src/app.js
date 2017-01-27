import angular from 'angular';
import ngRoute from 'angular-route';

import {SignupComponent} from './signup/signup.component';
import {GameComponent} from './game/game.component';

import {GameCanvasComponent, GameDirectivet} from './game/game.canvas.component';

import {JSCityService} from './JSCity.service';

angular.module('app', [
  ngRoute
])
.value('Version', '0.0.1')

.service('JSCityService', JSCityService)

.component('signupComponent', SignupComponent)
.component('gameComponent', GameComponent)
//.component("drawing", GameCanvasComponent)
.directive('drawingCanvas', () => new GameCanvasComponent)

.config(function($routeProvider, $locationProvider, $logProvider) {

  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      template: '<h1>Bienvenue</h1>'
    })
    .when('/signup', {
      template: '<signup-component></signup-component>'
    })
    .when('/game', {
      template: '<game-component></game-component>'
    })

    .otherwise('/');

})

.run(function() {
});