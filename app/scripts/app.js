'use strict';

/**
 * @ngdoc overview
 * @name eventPlannerApp
 * @description
 * # eventPlannerApp
 *
 * Main module of the application.
 */
angular
  .module('eventPlannerApp', ['firebase','UserValidation','ui.router'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
     .state('home', {
      url:'/home',
      templateUrl:'views/home.html'
    })
    .state('register', {
      url:'/register',
      templateUrl:'views/register.html',
      controller:'registerCtrl',
      controllerAs: 'vm'
    })
    .state('login',{
      url:'/login',
      templateUrl:'views/login.html',
      controller:'LoginCtrl',
      controllerAs: 'vm'
    })
    .state('eventCreate',{
      url:'/eventCreate',
      templateUrl:'views/eventCreate.html',
      controller:'EventcreateCtrl'
    })
    .state('eventView',{
      url:'/eventView',
      templateUrl:'views/eventView.html',
      controller:'EventviewCtrl'
    });    
  }])

  angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.formregister.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
 })

 logout.addEventListener('click',function() {
 	firebase.auth().signOut();
 })
 var userid;
 firebase.auth().onAuthStateChanged(function(firebaseUser) {
 	if(firebaseUser)
 	{
    userid = firebaseUser.uid;
 		console.log("Logged in"+firebaseUser.uid);
 		eventHide.classList.remove('hide');
    eventViewH.classList.remove('hide');
 		logout.classList.remove('hide');
 		login.classList.add('hide');
 		register.classList.add('hide');

 	}
 	else
 	{
 		console.log('not logged in');
 		eventHide.classList.add('hide');
    eventViewH.classList.add('hide');
 		logout.classList.add('hide');
 		login.classList.remove('hide');
 		register.classList.remove('hide');

 	}
 });
	
 


 