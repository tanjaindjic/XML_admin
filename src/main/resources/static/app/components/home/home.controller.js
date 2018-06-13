(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window'];
    function homeController($location, $scope, $rootScope,$http, $cookies, $window) {
    	var hc = this;
  
    	var init = function(){
    		

        };
        init();

        
    }

})();