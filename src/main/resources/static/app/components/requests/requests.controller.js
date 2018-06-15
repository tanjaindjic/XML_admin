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
				$scope.reg.show();
				$scope.req.show();
			} else
				$location.path("/home")

				var header = createAuthorizationTokenHeader();
			$http({
				method : 'GET',
				url : "https://localhost:8096/dtorequests",
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8', header
			        
			      })
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
		
		$scope.showCSR = function(req_id){
			if (document.getElementById('req_id').style.display = 'block') {
		        document.getElementById('req_id').style.display = 'none';
		        
		    } else {
		        document.getElementById('req_id').style.display = 'block';
		        
		    }
		}
		
		$scope.reject = function(req_id, k_id){
			var i;
			for(i = 0; i < $scope.allRequests.length; i++){
				if($scope.allRequests[i].id===req_id) {
                    break;
                }			
			}
			$scope.allRequests.splice(i,1);
			$http({
				method : 'DELETE',
				url : "https://localhost:8096/requests/" + req_id + "/user/" + k_id
			}).then(function successCallback(response) {
				if(response.data!="")
					$scope.message=response.data;

			}, function errorCallback(response) {
				
				$scope.message = "Error deleting request.";
			});
			
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

		// REGISTER EVENT LISTENERS
		// =============================================================

		$("#logoutBtn").click(doLogout);

	}

})();