(function () {
    'use strict';

    angular
		.module('app')
		.controller('extraServicesController', extraServicesController);

    extraServicesController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window','$state', '$timeout'];
    function extraServicesController($location, $scope, $rootScope,$http, $cookies, $window,$state, $timeout) {
    	var xsc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.services = [];
    		$scope.catsOfAcc = [];
    		$scope.loggedIn = false;
    		$scope.addNew = false;
    			
    		var refresh = function(){
    			$state.go($state.current.name, {}, {reload: true})
    		}
    		var getRequests = function() {

    			$.ajax({
    				url : "https://localhost:8096/api/dodatneUsluge",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.services = data;
    						$timeout(function(){ $scope.$apply(); }, 150);
        					$scope.message ="";
        					console.log($scope.services.length)
    					
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

    		
    
    		$scope.deleteXS = function(id){
    			$.ajax({
    				url : "https://localhost:8096/api/dodatneUsluge/" + id,
    				type : "DELETE",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					getRequests();
    					}

    			});
    			
    		}
    		
    		$scope.newEntry = function(){
    			$scope.addNew = true;
    		}

    		function getJwtToken() {
    			return localStorage.getItem($scope.TOKEN_KEY);
    		}


    		function removeJwtToken() {
    			localStorage.removeItem($scope.TOKEN_KEY);
    		}
    		
    		$scope.cancel = function(){
    			$scope.addNew = false;
    		}
    		
    		$scope.add = function(){
    			if(document.getElementById("newEntry").value.trim()==""){
    				return;
    			}
    			console.log(document.getElementById("newEntry").value)
    			
    			$http({
                method: 'POST',
                url: "https://localhost:8096/api/dodatneUsluge/",
                headers : createAuthorizationTokenHeader(),
                data: document.getElementById("newEntry").value
            }).then(function successCallback(response) {
            	getRequests();
            });
	
    			document.getElementById("newEntry").value="";
    			$scope.addNew = false;
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