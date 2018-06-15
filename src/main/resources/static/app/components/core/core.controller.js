(function() {
	'use strict';

	angular.module('app').controller('coreController', coreController);

	coreController.$inject = [ '$location', '$scope', '$rootScope', '$http', '$cookies', '$window' ];
	function coreController($location, $scope, $rootScope, $http, $cookies, $window) {
		var cc = this;
		$scope.TOKEN_KEY = "jwtToken";
		$scope.logout = $("#logoutBtn");
		$scope.reg = $("#registerBtn");
		$scope.loggedIn = false;
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}
		
	
		
		var init = function() {

			if (getJwtToken()) {
				$scope.logout.show();
				$scope.reg.show();
				$scope.loggedIn = true;
			} else{
				$scope.logout.hide();
				$scope.reg.hide();
				$scope.loggedIn = false;
			}
				

		};
		init();

		function removeJwtToken() {
			localStorage.removeItem($scope.TOKEN_KEY);
		}
		
		$scope.login = function() {
			$location.path('/login');
		}
		
		$scope.register = function() {
			$location.path('/register');
		}
		
		$scope.home = function() {
			$location.path('/home');
		}
		
		$scope.logout = function(){
			removeJwtToken();
			$scope.logout.hide();
			$scope.reg.hide();
			$scope.loggedIn = false;
			
			$location.path("/login")
		}

	}

})();