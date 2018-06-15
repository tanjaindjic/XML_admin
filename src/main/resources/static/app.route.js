(function () {
    'use strict';

    angular
		.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

      $urlRouterProvider.otherwise("/home");

      $stateProvider
		 .state('core', {
			 url: '/',
			 templateUrl: 'app/components/core/core.html',
			 controller: 'coreController',
			 controllerAs: 'cc'
		 })
		 .state('core.home', {
			 url: 'home',
			 templateUrl: 'app/components/home/home.html',
			 controller: 'homeController',
			 controllerAs: 'hc'
		 })
		 .state('core.login', {
			 url: 'login',
			 templateUrl: 'app/components/login/login.html',
			 controller: 'loginController',
			 controllerAs: 'lc'
		 })
		 .state('core.register', {
			 url: 'register',
			 templateUrl: 'app/components/register/register.html',
			 controller: 'registerController',
			 controllerAs: 'regc'
		 })
		 .state('core.succ', {
			 url: 'success/{id}',
			 templateUrl: 'app/components/succ/succ.html',
			 controller: 'succController',
			 controllerAs: 'succ'
		 });
     /* $locationProvider.html5Mode({
    	  enabled: true,
    	  requireBase: false
    	});*/
    }]);


})();
