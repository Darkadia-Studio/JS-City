import angular from 'angular';
import ngRoute from 'angular-route';

import {SignupComponent} from './signup/signup.component';
import {GameComponent} from './game/game.component';

import {GameDirective} from './game/game.directive';

import {JSCityService} from './JSCity.service';

angular.module('app', [
  ngRoute
])
.value('Version', '0.0.1')

.service('JSCityService', JSCityService)

.component('signupComponent', SignupComponent)
.component('gameComponent', GameComponent)

.directive("drawing", GameDirective)

.config(function($routeProvider, $locationProvider) {

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