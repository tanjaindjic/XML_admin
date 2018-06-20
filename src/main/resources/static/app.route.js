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
		 .state('core.certificate', {
			 url: 'certificate',
			 templateUrl: 'app/components/certificate/certificate.html',
			 controller: 'certificateController',
			 controllerAs: 'crc'
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
		 .state('core.allComments', {
			 url: 'allComments',
			 templateUrl: 'app/components/allComments/allComments.html',
			 controller: 'allCommentsController',
			 controllerAs: 'acc'
		 })
		 .state('core.extraServices', {
			 url: 'extraServices',
			 templateUrl: 'app/components/extraServices/extraServices.html',
			 controller: 'extraServicesController',
			 controllerAs: 'xsc'
		 })
		 .state('core.aTypes', {
			 url: 'aTypes',
			 templateUrl: 'app/components/aTypes/aTypes.html',
			 controller: 'aTypesController',
			 controllerAs: 'ac'
		 })
		 .state('core.accomCategories', {
			 url: 'accomCategories',
			 templateUrl: 'app/components/accomCategories/accomCategories.html',
			 controller: 'accomCategoriesController',
			 controllerAs: 'accomcc'
		 })
		 .state('core.allUsers', {
			 url: 'allUsers',
			 templateUrl: 'app/components/allUsers/allUsers.html',
			 controller: 'allUsersController',
			 controllerAs: 'auc'
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
