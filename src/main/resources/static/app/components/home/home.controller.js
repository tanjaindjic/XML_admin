(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window','$state','$timeout'];
    function homeController($location, $scope, $rootScope,$http, $cookies, $window, $state, $timeout) {
    	var hc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.allRequests = [];
    		$scope.loggedIn = false;
    		
    		var init = function() {

    			// INITIAL CALLS
    			// =============================================================
    			if (getJwtToken()) {
    				
    				$scope.loggedIn = true;
    			} else {
    			
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
    						$timeout(function(){ $scope.$apply(); }, 150);
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

    			$state.go($state.current.name, {}, {reload: true})
    		}
    		
    		$scope.approve = function(req_id, k_id){
    			var i;
    			for (i = 0; i < $scope.allRequests.length; i++) {
    				if ($scope.allRequests[i].csrId === req_id) {
    					break;
    				}
    			}
    			$scope.allRequests.splice(i, 1);
    			console.log("prihvata reqId: " + req_id + ", userId: " + k_id)
    			var header = createAuthorizationTokenHeader();

    			$.ajax({
    				url : "https://localhost:8096/requests/" + req_id + "/user/"
    						+ k_id,
    				type : "GET",
    				contentType : "application/json; charset=utf-8",
    				dataType : "json",
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					$scope.message = "Request successfully approved."
    				},
    				error : function(data, textStatus, jqXHR) {
    					$scope.message = "Error. Request was not approved :(."
    				}
    			});

    			$location.path("/home")

    		}

    		function getJwtToken() {
    			return localStorage.getItem($scope.TOKEN_KEY);
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

    		
    	}


})();