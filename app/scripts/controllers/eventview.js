'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:EventviewCtrl
 * @description
 * # EventviewCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('EventviewCtrl',['$scope', function ($scope) {
    var ref = firebase.database().ref();
    var vm = this;
    var eventlist = [];
    var fref = ref.child(userid);
    fref.on("child_added",function(snapshot){
    	var data = snapshot.val();  
    	eventlist.push(data);	   	
    	})
    vm.event = eventlist;

  }]);
