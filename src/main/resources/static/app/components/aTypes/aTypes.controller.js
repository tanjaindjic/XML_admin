(function () {
    'use strict';

    angular
		.module('app')
		.controller('aTypesController', aTypesController);

    aTypesController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window','$state', '$timeout'];
    function aTypesController($location, $scope, $rootScope,$http, $cookies, $window,$state, $timeout) {
    	var ac = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.typesOfAcc = [];
    		$scope.loggedIn = false;
    		$scope.addNew = false;
    		
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
    						$timeout(function(){ $scope.$apply(); }, 150);
        		
        					console.log($scope.typesOfAcc.length)
    					
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
    			$scope.message ="";
    			$.ajax({
    				url : "https://localhost:8096/api/tipService/" + id,
    				type : "DELETE",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    				
    					$scope.message = data.text;
    					$timeout(function(){ $scope.$apply(); }, 150);
    					getRequests();
    					
    					
    				},
    				error:  function(data, textStatus, jqXHR) {
    					console.log(data)
    				
    					$scope.message=data.text;
    					getRequests();
    					
    					
    				}

    			});
    			
    		}
    		$scope.newEntry = function(){
    			$scope.addNew = true;
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
                url: "https://localhost:8096/api/tipService/",
                headers : createAuthorizationTokenHeader(),
                data: document.getElementById("newEntry").value
            }).then(function successCallback(response) {
            	getRequests();
    			$scope.message ="";
            });
	
    			document.getElementById("newEntry").value="";
    			$scope.addNew = false;
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