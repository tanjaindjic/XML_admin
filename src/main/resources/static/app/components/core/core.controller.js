(function() {
	'use strict';

	angular.module('app').controller('coreController', coreController);

	coreController.$inject = [ '$location', '$scope', '$rootScope', '$http', '$cookies', '$window' ];
	function coreController($location, $scope, $rootScope, $http, $cookies, $window) {
		var cc = this;
		$scope.TOKEN_KEY = "jwtToken";
		$scope.loggedIn = false;
		$scope.username = "";
		
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}
		
		
		var init = function() {

			if (getJwtToken()) {
				
				$scope.loggedIn = true;
				$scope.username = " " +jwt_decode(getJwtToken()).sub;
			} else{
			
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
		
		
		$scope.allUsers = function() {
			$location.path('/allUsers');
			
		}
		
		$scope.logout = function(){
			removeJwtToken();
			$scope.loggedIn = false;
			$scope.username="";
			$window.location="https://localhost:8090/#!/login"
		}

	}

})();