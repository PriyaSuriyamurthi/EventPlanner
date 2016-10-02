'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('LoginCtrl',['$scope','$state',function($scope,$state){
		$scope.loginUser = function() {
			console.log("Login process...");
			firebase.auth().signInWithEmailAndPassword($scope.email,$scope.password).
			then(function(value)
			{				
				$state.go('eventCreate');
			})
			.catch(function(error){
				var errorCode = error.code;				
			});
		}	

}]);
