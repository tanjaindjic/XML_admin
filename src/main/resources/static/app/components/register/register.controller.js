(function() {
	'use strict';

	angular.module('app').controller('registerController', registerController);

	registerController.$inject = [ '$location', '$scope', '$rootScope', '$http',
			'$window', '$cookies', '$stateParams', '$state', '$timeout' ];
	function registerController($location, $scope, $rootScope, $http, $window,
			$cookies, $stateParams, $state, $timeout) {

		var regc = this;

		var init = function() {
			$scope.TOKEN_KEY = "jwtToken"
			$scope.notLoggedIn = $("#notLoggedIn");
			$scope.loggedIn = $("#loggedIn").hide();
			$scope.loggedInBody = $("#loggedInBody");
			$scope.response = $("#response");
			$scope.login = $("#loginBtn");
			$scope.reg = $("#registerBtn");
			$scope.userInfo = $("#userInfo").hide();
			$scope.logout = $("#logoutBtn").hide();
			$scope.message = "";

			// INITIAL CALLS
			// =============================================================
			if (getJwtToken()) {
				$scope.login.hide();
				$scope.notLoggedIn.hide();
				$scope.logout.show();
				showTokenInformation();
				showUserInformation();
				$scope.reg.hide();
				$location.path("/home")
			}

		};

		init();
		
		// FUNCTIONS
		// =============================================================
		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
		}

	

		function doRegister(regData) {
			console.log(JSON.stringify(regData))
			 $http({
	                method: 'POST',
	                url: "https://localhost:8096/register",
	                data : JSON.stringify(regData)
	            }).then(function successCallback(response) {
	            	
					$location.path("/success/1")
			
	            }, function errorCallback(response) {
	            	console.log(response)
	            	console.log(response.data.text)
	            	$scope.message = response.data.text;
	            });

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
		$("#registerForm").submit(function(event) {
			event.preventDefault();
			var $form = $(this);
			var pass1 = $form.find('input[name="password1"]').val();
			var pass2 = $form.find('input[name="password2"]').val();
			if(pass1!=pass2){
				$scope.message = "Passwords don't match";
				return;
			}
				
			
			var formData = {
				"firstname" : $form.find('input[name="firstname"]').val(),
				"lastname" : $form.find('input[name="lastname"]').val(),
				"username" : $form.find('input[name="username"]').val(),
				"password1" : $form.find('input[name="password1"]').val(),
				"password2" : $form.find('input[name="password2"]').val(),
				"agent" : $form.find('input[name="isAgent"]').val(),
				"email" : $form.find('input[name="email"]').val()
			};

			doRegister(formData);
		});

		$("#logoutBtn").click(doLogout);

		
		$scope.loggedIn.click(function() {
			$scope.loggedIn.toggleClass("text-hidden").toggleClass("text-shown");
		});

	}

})();