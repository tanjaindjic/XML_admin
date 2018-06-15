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

    		};

    		init();

    		var getRequests = function() {

    			$.ajax({
    				url : "https://localhost:8096/user",
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					if(data!=""){
    						$scope.allUsers = data;
        					$scope.message ="";
    					}else $scope.message = "No data available."
    				},
    				
    			});
    		}

    		getRequests();
    		
    		// FUNCTIONS
    		// =============================================================

    		$scope.setButtons = function() {
    			
    			var i;
    			for(i = 0; i < $scope.allUsers.length; i++){
    				if($scope.allUsers[i].statusNaloga==="NEPOTVRDJEN" || $scope.allUsers[i].statusNaloga==="AKTIVAN")
    					document.getElementById($scope.allUsers[i]).innerHTML = "Block";
    				else
        				document.getElementById($scope.allUsers[i]).innerHTML = "Unblock";
    			}
    				
 
    		}
    
    		$scope.block = function(id){
    			$.ajax({
    				url : "https://localhost:8096/user/block/" + id,
    				type : "GET",/*
									 * contentType: "application/json;
									 * charset=utf-8", dataType: "json",
									 */
    				headers : createAuthorizationTokenHeader(),
    				success : function(data, textStatus, jqXHR) {
    					if(document.getElementById(id).innerHTML==="Block")
    						document.getElementById(id).innerHTML = "Unblock";
    					else document.getElementById(id).innerHTML = "Block";
    					},
    				error: $scope.message = "Error blocking user."
    				
    				
    			});
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