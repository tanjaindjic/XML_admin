(function() {
	'use strict';

	angular.module('app').controller('coreController', coreController);

	coreController.$inject = [ '$location', '$scope', '$rootScope', '$http', '$cookies', '$window', '$state' ];
	function coreController($location, $scope, $rootScope, $http, $cookies, $window, $state) {
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
				$state.go("core.login", {}, {reload:true})
			}
				

		};
		init();

		function removeJwtToken() {
			localStorage.removeItem($scope.TOKEN_KEY);
		}
		
		$scope.login = function() {
			$state.go("core.login", {}, {reload:false})
		}
		
		$scope.register = function() {
			$state.go("core.register", {}, {reload:false})
		}
		
		$scope.home = function() {
			$state.go("core.home", {}, {reload:false})
		}
		
		
		$scope.allUsers = function() {
			$state.go("core.allUsers", {}, {reload:false})		
		}
		
		$scope.allComments = function() {
			$state.go("core.allComments", {}, {reload:false})			
		}
		
		$scope.catalogs = function() {
			$state.go("core.catalogs", {}, {reload:false})		
		}
		
		$scope.logout = function(){
			removeJwtToken();
			$scope.loggedIn = false;
			$scope.username="";
			$window.location="https://localhost:8090/#!/login"
		}

	}

})();