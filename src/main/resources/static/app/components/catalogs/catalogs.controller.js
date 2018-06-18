(function () {
    'use strict';

    angular
		.module('app')
		.controller('catalogsController', catalogsController);

    catalogsController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window','$state'];
    function catalogsController($location, $scope, $rootScope,$http, $cookies, $window,$state) {
    	var catc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.typesOfAcc = [];
    		$scope.catsOfAcc = [];
    		$scope.loggedIn = false;
    			
    		var refresh = function(){
    			$state.go($state.current.name, {}, {reload: true})
    		}
    		var getRequests = function() {

    			$.ajax({
    				url : "https://localhost:8096/api/tipService",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.typesOfAcc = data;
        					$scope.message ="";
        					console.log($scope.typesOfAcc.length)
    					
    				}
    				
    			});
    			
    			$.ajax({
    				url : "https://localhost:8096/api/kategorija",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.catsOfAcc = data;
        					$scope.message ="";
        					console.log($scope.catsOfAcc.length)
    					
    				}
    				
    			});
    		}

    		
    		
    		var init = function() {

    			// INITIAL CALLS
    			// =============================================================
    			if (getJwtToken()) {
    				
    				$scope.loggedIn = true;
    			} else {
    			
    				$location.path("/login")
    				$scope.loggedIn= false;
    			}
    			
    			getRequests();

    		};

    		init();

    		
    		
    		// FUNCTIONS
    		// =============================================================

    		
    
    		$scope.deleteTOC = function(id){
    			$.ajax({
    				url : "https://localhost:8096/api/tipService/" + id,
    				type : "DELETE",/*
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