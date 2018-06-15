(function() {
	'use strict';

	angular.module('app').controller('requestsController', requestsController);

	requestsController.$inject = [ '$location', '$scope', '$rootScope',
			'$http', '$window', '$cookies', '$stateParams', '$state',
			'$timeout' ];
	function requestsController($location, $scope, $rootScope, $http, $window,
			$cookies, $stateParams, $state, $timeout) {

		var reqc = this;
		$scope.TOKEN_KEY = "jwtToken"
		$scope.login = $("#loginBtn");
		$scope.reg = $("#registerBtn");
		$scope.logout = $("#logoutBtn");
		$scope.req = $("requestsBtn");
		$scope.message = "";
		$scope.allRequests = [];

		var init = function() {

			// INITIAL CALLS
			// =============================================================
			if (getJwtToken()) {
				$scope.login.hide();
				$scope.logout.show();
				$scope.reg.show();
				$scope.req.show();
			} else {
				$scope.login.show();
				$scope.logout.hide();
				$scope.reg.hide();
				$scope.req.hide();
				$location.path("/home")
			}

		};

		init();

		var getRequests = function() {

			$.ajax({
				url : "https://localhost:8096/dtorequests",
				type : "GET",/*
								 * contentType: "application/json;
								 * charset=utf-8", dataType: "json",
								 */
				headers : createAuthorizationTokenHeader(),
				success : function(data, textStatus, jqXHR) {
					$scope.allRequests = data;
				},
				error : $scope.message = "No data available."
			});
		}

		getRequests();

		// FUNCTIONS
		// =============================================================

		$scope.showCSR = function(req_csr) {
			/*if (document.getElementById(req_id).style.display = 'none')
				document.getElementById(req_id).style.display = 'block';

			else
				document.getElementById(req_id).style.display = 'none';
				
*/
			
			alert(req_csr)
		}

		$scope.reject = function(req_id, k_id) {
			var i;
			for (i = 0; i < $scope.allRequests.length; i++) {
				if ($scope.allRequests[i].csrId === req_id) {
					break;
				}
			}
			$scope.allRequests.splice(i, 1);
			console.log("brisem reqId: " + req_id + ", userId: " + k_id)
			var header = createAuthorizationTokenHeader();

			$.ajax({
				url : "https://localhost:8096/requests/" + req_id + "/user/"
						+ k_id,
				type : "DELETE",
				contentType : "application/json; charset=utf-8",
				dataType : "json",
				headers : createAuthorizationTokenHeader(),
				success : function(data, textStatus, jqXHR) {
					$scope.message = "Request successfully deleted."
				},
				error : function(data, textStatus, jqXHR) {
					$scope.message = "Error. Request was not deleted."
				}
			});

			getRequests();

		}

		function getJwtToken() {
			return localStorage.getItem($scope.TOKEN_KEY);
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

		$("#logoutBtn").click(doLogout);

	}

})();