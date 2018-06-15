(function() {
	'use strict';

	angular.module('app').controller('loginController', loginController);

	loginController.$inject = [ '$location', '$scope', '$rootScope', '$http',
			'$window', '$cookies', '$stateParams', '$state', '$timeout' ];
	function loginController($location, $scope, $rootScope, $http, $window,
			$cookies, $stateParams, $state, $timeout) {

		var lc = this;
		$scope.message="";

		$scope.goToState = function(state) {
			$state.go(state, {
				"id" : $scope.userId
			});
		}

		var init = function() {
			$scope.TOKEN_KEY = "jwtToken"
			$scope.req = $("#requestsBtn");
			$scope.login = $("#loginBtn");
			$scope.reg = $("#registerBtn");
			$scope.logout = $("#logoutBtn").hide();

			// INITIAL CALLS
			// =============================================================
			if (getJwtToken()) {
				$scope.login.hide();
				$scope.logout.show();				
				$scope.reg.show();
				$scope.req.show();
				$location.path("/home")
			}

		};

		init();

		// FUNCTIONS
		// =============================================================
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}

		function setJwtToken(token) {
			localStorage.setItem($scope.TOKEN_KEY, token);
		}

		function removeJwtToken() {
			localStorage.removeItem($scope.TOKEN_KEY);
		}

		function doLogin(loginData) {
			console.log(JSON.stringify(loginData))
			 $http({
	                method: 'POST',
	                url: "https://localhost:8096/auth",
	                data : JSON.stringify(loginData)
	            }).then(function successCallback(response) {
	            	console.log(response.data.token)
	            	setJwtToken(response.data.token);
					$scope.login.hide();
					$scope.logout.show();
					$scope.reg.show();
					$scope.req.show();
					$location.path("/home")
			
	            }, function errorCallback(response) {
	            	$scope.message="Bad credentials."
	            });

		}

		function doLogout() {
			removeJwtToken();
			$scope.login.show();
			$scope.logout.hide();
			$scope.reg.hide();
			$scope.req.hide();
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
		$("#loginForm").submit(function(event) {
			event.preventDefault();

			var $form = $(this);
			var formData = {
				username : $form.find('input[name="username"]').val(),
				password : $form.find('input[name="password"]').val()
			};

			doLogin(formData);
		});

		$("#logoutBtn").click(doLogout);

		

	}

})();