(function () {
    'use strict';

    angular
		.module('app')
		.controller('allCommentsController', allCommentsController);

    allCommentsController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window'];
    function allCommentsController($location, $scope, $rootScope,$http, $cookies, $window) {
    	var acc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.allComments = [];
    		$scope.loggedIn = false;
    		
    		
    		
    		var refresh = function(){
    			getRequests();
    			$location.path("/allComments");
    		}
		
    		var getRequests = function() {

    			$.ajax({
    				url : "https://localhost:8096/comments/unpublished",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.allComments = data;
        					$scope.message ="";
        					console.log($scope.allComments.length)
    					
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

    		
    
    		$scope.publish = function(id){
    			$.ajax({
    				url : "https://localhost:8096/comments/publish/" + id,
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					refresh();
    					}

    			});
    			
    			refresh();
    		}
    		

    		$scope.deleteCom = function(id){
    			$.ajax({
    				url : "https://localhost:8096/comments/" + id,
    				type : "DELETE",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					refresh();
    					}

    			});
    			
    			refresh();
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