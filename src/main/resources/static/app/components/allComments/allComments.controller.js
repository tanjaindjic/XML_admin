(function () {
    'use strict';

    angular
		.module('app')
		.controller('allCommentsController', allCommentsController);

    allCommentsController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window','$state','$timeout'];
    function allCommentsController($location, $scope, $rootScope,$http, $cookies, $window,$state,$timeout) {
    	var acc = this;
    	
    	$scope.TOKEN_KEY = "jwtToken"
    	
    		$scope.message = "";
    		$scope.allComments = [];
    		$scope.loggedIn = false;    		
    		
    		var refresh = function(){
    			$state.go($state.current.name, {}, {reload: true})
    		}
		
    		var getRequests = function() {

    			$.ajax({
    				url : "https://us-central1-xmlcoment.cloudfunctions.net/getUnpublishedReviews?smestajId=0",
    				type : "GET",
    				success : function(data, textStatus, jqXHR) {
    					
    						$scope.allComments = data;

    						$timeout(function(){ $scope.$apply(); }, 150);
        					$scope.message ="";
        					console.log($scope.allComments.length)
        				//	refresh();
    					
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

    		
    
    		$scope.publish = function(userId,rezervacijaId){
    			console.log("comment " + userId)
    			var data =
    			{
    					"userId":userId,
    					"rezervacijaId":rezervacijaId,
    					"comment":"Iz clouda",
    					"approved":"1",
    					"ocena":0,
    					"smestajId":4,
    					"userName":"username3"
    					
    				};
    			
    			$http({
                    method: 'POST',
                    url: "https://us-central1-xmlcoment.cloudfunctions.net/updateReview",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: data
                }).then(function successCallback(response) {


                }, function errorCallback(response) {

                });

    		
    			refresh();
    			
    		}
    		

    		$scope.deleteCom = function(userId, rezervacijaId){
    			$.ajax({
    				url : "https://us-central1-xmlcoment.cloudfunctions.net/deleteReview?userId=" + userId + "&rezervacijaId=" + rezervacijaId,
    				type : "GET",
    				success : function(data, textStatus, jqXHR) {
    					
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