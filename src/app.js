import angular from 'angular';
import ngRoute from 'angular-route';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {GameComponent} from './game/game.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './profil/login/login.component';

import {GameCanvasComponent, GameDirectivet} from './game/game.canvas.component';

import {JSCityService} from './services/JSCity.service';
import {UserService} from './services/user.service';
import {MailService} from './services/mail.service';

angular.module('app', [
  ngRoute
])
.value('Version', '0.0.1')

.service('JSCityService', JSCityService)
.service('UserService', UserService)
.service('MailService', MailService)

.component('signinComponent', SigninComponent)
.component('signupComponent', SignupComponent)
.component('gameComponent', GameComponent)
.component('home', HomeComponent)
.component('loginComponent', LoginComponent)
//.component("drawing", GameCanvasComponent)
.directive('drawingCanvas', () => new GameCanvasComponent)

.config(function($routeProvider, $locationProvider, $logProvider) {

  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      template: '<home></home>'
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