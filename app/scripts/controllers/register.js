(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name eventPlannerApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the eventPlannerApp
     */
    angular.module('eventPlannerApp')
        .controller('registerCtrl', ['$scope', '$state', function($scope, $state) {
            $('#name').focus();
            $scope.createUser = function() {
                firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).
                then(function(value) {
                        $state.go('eventCreate');
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        if (errorCode === "auth/email-already-in-use") {
                            $scope.errorMsg = true;
                            $scope.errormessage = "Email Address is already in Use";
                            $scope.$apply();
                        }

                    });
            };
        }]);


})();