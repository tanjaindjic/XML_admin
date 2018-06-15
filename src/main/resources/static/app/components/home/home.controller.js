(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window'];
    function homeController($location, $scope, $rootScope,$http, $cookies, $window) {
    	var hc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    		$scope.login = $("#loginBtn");
    		$scope.reg = $("#registerBtn");
    		$scope.logout = $("#logoutBtn");
    		$scope.req = $("requestsBtn");
    		$scope.message = "";
    		$scope.allRequests = [];
    		$scope.loggedIn = false;
    		
    		var init = function() {

    			// INITIAL CALLS
    			// =============================================================
    			if (getJwtToken()) {
    				$scope.login.hide();
    				$scope.logout.show();
    				$scope.reg.show();
    				$scope.req.show();
    				$scope.loggedIn = true;
    			} else {
    				$scope.login.show();
    				$scope.logout.hide();
    				$scope.reg.hide();
    				$scope.req.hide();
    				$location.path("/login")
    				$scope.loggedIn= false;
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
    					if(data!=""){
    						$scope.allRequests = data;
        					$scope.message ="";
    					}else $scope.message = "No data available."
    				},
    				
    			});
    		}

    		getRequests();
    		
    		// FUNCTIONS
    		// =============================================================

    		$scope.showCSR = function(req_id) {
    			
    				document.getElementById(req_id+"csr").style.display = 'block';
    				document.getElementById(req_id+"hide").style.display = 'inline-block';
    				document.getElementById(req_id+"show").style.display = 'none';
 
    		}
    		$scope.hideCSR = function(req_id) {
    			
				document.getElementById(req_id+"csr").style.display = 'none';
				document.getElementById(req_id+"hide").style.display = 'none';
				document.getElementById(req_id+"show").style.display = 'inline-block';

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

    			$location.path("/home")

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
    			$scope.loggedIn=false;
    			$location.path("/home")
    		}

    		function removeJwtToken() {
    			localStorage.removeItem($scope.TOKEN_KEY);
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