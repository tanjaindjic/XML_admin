(function () {
    'use strict';

    angular
		.module('app')
		.controller('allUsersController', allUsersController);

    allUsersController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window'];
    function allUsersController($location, $scope, $rootScope,$http, $cookies, $window) {
    	var auc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    		$scope.reg = $("#registerBtn");
    		$scope.logout = $("#logoutBtn");
    		$scope.req = $("requestsBtn");
    		$scope.message = "";
    		$scope.allUsers = [];
    		$scope.loggedIn = false;
    		
    		
    		
    		var refresh = function(){
    			getRequests();
    			$location.path("/allUsers");
    		}
		
    		var getRequests = function() {

    			$.ajax({
    				url : "https://localhost:8096/user",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.allUsers = data;
        					$scope.message ="";
        					refresh();
    					
    				}
    				
    			});
    		}

    		
    		
    		var init = function() {

    			// INITIAL CALLS
    			// =============================================================
    			if (getJwtToken()) {
    				$scope.logout.show();
    				$scope.reg.show();
    				$scope.req.show();
    				$scope.loggedIn = true;
    			} else {
    				$scope.logout.hide();
    				$scope.reg.hide();
    				$scope.req.hide();
    				$location.path("/login")
    				$scope.loggedIn= false;
    			}
    			
    			getRequests();

    		};

    		init();

    		
    		
    		// FUNCTIONS
    		// =============================================================

    		
    
    		$scope.block = function(id){
    			$.ajax({
    				url : "https://localhost:8096/user/block/" + id,
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					refresh();
    					}

    			});
    			
    			
    		}
    		
    		
 

    		function getJwtToken() {
    			return localStorage.getItem($scope.TOKEN_KEY);
    		}

    		function doLogout() {
    			removeJwtToken();
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