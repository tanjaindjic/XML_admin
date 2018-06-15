(function () {
    'use strict';

    angular
		.module('app')
		.controller('succController', succController);

    succController.$inject = ['$location', '$scope', '$rootScope','$http', '$cookies', '$window', '$timeout'];
    function succController($location, $scope, $rootScope,$http, $cookies, $window,  $timeout) {
    	var succ = this;
  
    	$scope.seconds = 5000;
    	$scope.message = "";
        //timer callback
        var timer = function() {
            if( $scope.seconds > 0 ) {
                $scope.seconds -= 1000;
                $timeout(timer, 1000);
            }else $location.path("/login")
        }
        
      
        
        
    	var init = function(){
    		var absUrl = $location.absUrl();
    		var lastPart = absUrl.split("/").pop();
    		
    		if(lastPart==1){
    			$scope.message = "Successful registration. Email with registration details was sent."
    			document.getElementById("timer").style.display = "block";
    			$timeout(timer, 1000);  
    		}
    			
        };
        init();

        
    }

})();