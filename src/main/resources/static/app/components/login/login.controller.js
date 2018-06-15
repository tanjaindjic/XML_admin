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
			$scope.logout = $("#logoutBtn");
			$scope.loggedIn = false;

			// INITIAL CALLS
			// =============================================================
			if (getJwtToken()) {
				$scope.loggedIn = true;
				$location.path("/home")
			}else{
				
				$scope.loggedIn = false;
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
					
					$window.location.reload();
			
	            }, function errorCallback(response) {
	            	$scope.message="Bad credentials."
	            });

		}

		function doLogout() {
			removeJwtToken();
			$scope.loggedIn= false;
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