(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name eventPlannerApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the eventPlannerApp
     */
    angular.module('eventPlannerApp')
        .controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {            
            $('#email').focus();
            $scope.loginUser = function() {
                console.log("Login process...");
                firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).
                then(function(value) {
                        $state.go('eventCreate');
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        if(errorCode === "auth/user-not-found")
                        {
                         $scope.errorMsg = true;
                    	 $scope.errormessage = "Email Id/Password is not registered";
                    	 
                    	}
                    	else if(errorCode === "auth/wrong-password")
                    	{
                    		$scope.errorMsg = true;
                    	 	$scope.errormessage = "Email Id/Password is incorrect";
                    	 
                    	}
                    	 	$scope.$apply();
                    });
            };

        }]);
})();