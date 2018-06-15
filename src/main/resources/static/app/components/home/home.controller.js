(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window'];
    function homeController($location, $scope, $rootScope,$http, $cookies, $window) {
    	var hc = this;
  
    	var cc = this;
		$scope.TOKEN_KEY = "jwtToken";
		$scope.logout = $("#logoutBtn");
		$scope.login = $("#loginBtn");
		$scope.reg = $("#registerBtn");
		$scope.req = $("requestsBtn");
		
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}
		$scope.req.hide();
		var init = function() {

			if (getJwtToken()) {
				$scope.login.hide();
				$scope.logout.show();
				$scope.reg.show();
				$scope.req.show();
			} else{
				$scope.login.show();
				$scope.logout.hide();
				$scope.reg.hide();
				$scope.req.hide();
			}
				

		};
		init();

        
    }

})();