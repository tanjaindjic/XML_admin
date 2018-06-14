(function() {
	'use strict';

	angular.module('app').controller('requestsController', requestsController);

	requestsController.$inject = [ '$location', '$scope', '$rootScope', '$http',
			'$window', '$cookies', '$stateParams', '$state', '$timeout' ];
	function requestsController($location, $scope, $rootScope, $http, $window,
			$cookies, $stateParams, $state, $timeout) {

		var reqc = this;
		$scope.TOKEN_KEY = "jwtToken"
		$scope.login = $("#loginBtn");
		$scope.reg = $("#registerBtn");
		$scope.logout = $("#logoutBtn").hide();
		$scope.req = $("requestsBtn");
		$scope.message = "";
		$scope.allRequests=[];

		var init = function() {

			// INITIAL CALLS
			// =============================================================
			if (getJwtToken()) {
				$scope.login.hide();
				$scope.logout.show();
				$scope.reg.hide();
				$scope.req.show();
			} else
				$location.path("/home")

			$http({
				method : 'GET',
				url : "https://localhost:8090/requests"
			}).then(function successCallback(response) {
				if(response.data!="")
					$scope.allRequests=response.data;

			}, function errorCallback(response) {
				
				$scope.message = "No new requests at the moment.";
			});

		};

		init();

		// FUNCTIONS
		// =============================================================
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}

		function doLogout() {
			removeJwtToken();
			$scope.login.show();
			$scope.logout.hide();
			$scope.reg.show();
			$scope.userInfo.hide().find("#userInfoBody").empty();
			$scope.loggedIn.hide();
			$scope.loggedInBody.empty();
			$scope.notLoggedIn.show();
			$location.path("/home")
		}

		function createAuthorizationTokenHeader() {
			var token = getJwtToken();
			if (token) {
				return {
					"Authorization" : "Bearer " + token
				};
			} else {
				return {};
			}
		}

		// REGISTER EVENT LISTENERS
		// =============================================================

		$("#logoutBtn").click(doLogout);

	}

})();