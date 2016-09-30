'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:EventcreateCtrl
 * @description
 * # EventcreateCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('EventcreateCtrl',['$scope','$state',function ($scope,$state) {
  	var vm= this;
  	vm.page = 1;
  	var today = new Date().toISOString().split('.')[0];	
  	$('#startDate').attr('min', today);
  	$scope.guests = [];
  	var ref = firebase.database().ref();
    $scope.updateEndDate = function()
    {
    	if($scope.startDate !== null && typeof $scope.startDate !== 'undefined')
    	{
    		var start = $scope.startDate;
    		var month = start.getMonth() + 1;
    		if(month.toString().length === 1){
    			month = "0"+month;
    		}
    		var minutes = start.getMinutes();
    		if(minutes.toString().length === 1){
    			minutes = "0"+minutes;
    		}
    		var hours = start.getHours();
    		if(hours.toString().length === 1){
    			hours = "0"+hours;
    		}
    		var seconds = start.getSeconds();
    		if(seconds.toString().length === 1){
    			seconds = "0"+seconds;
    		}
    		var dates = start.getDate();
    		if(dates.toString().length === 1){
    			dates = "0"+dates;
    		}
    		start = start.getFullYear() + "-" + month + "-"+ dates +"T" +hours + ":" + minutes +":" + seconds;
    		console.log(start);
    		$('#endDate').attr('min',start);
    	}
    	if(typeof $scope.startDate !== 'undefined' &&  $scope.endDate !== null && typeof $scope.endDate !== 'undefined')
    	{
    		$scope.checkEndDate();
    	}
    }
    $scope.checkEndDate = function()
    {

    	if(typeof $scope.startDate !== 'undefined' &&  $scope.endDate !== null && typeof $scope.endDate !== 'undefined')
    	{
    	var start = $scope.startDate.toLocaleString().split(',')[1].trim();
    	var end = $scope.endDate.toLocaleString().split(',')[1].trim();
    	var startdate = $scope.startDate.toLocaleString().split(',')[0];
    	var enddate = $scope.endDate.toLocaleString().split(',')[0];
    	
    	var elem = start.split(' ');
    	var stSplit = elem[0].split(":");
    	var stHour = stSplit[0];
    	var stMin = stSplit[1];
    	var stAmPm = elem[1];
    	
    	if (stAmPm ==='PM')
   		{ 
        	if (stHour !== '12')
        	{
            stHour=stHour*1+12;
        	}       
    	}
    	else if(stAmPm ==='AM' && stHour === '12')
    	{
       		stHour = stHour -12;
    	}
    	else
    	{
        stHour=stHour;
    	}
    	elem = end.split(' ');
    	var enSplit = elem[0].split(":");
    	var enHour = enSplit[0];
    	var enMin = enSplit[1];
    	var enAmPm = elem[1];
    	if (enAmPm ==='PM')
   		{ 
        	if (enHour !== '12')
        	{
            enHour=enHour*1+12;
        	}       
    	}
    	else if(enAmPm ==='AM' && enHour ==='12')
    	{
       		enHour = enHour -12;
    	}
    	else
    	{
        enHour=enHour;
    	}
    	var sdate = new Date(startdate);
    	var edate = new Date(enddate);
    	if((((stHour > enHour)||((stHour === enHour) && (stMin > enMin))) && (enddate == startdate)) || (sdate > edate))
    	{
    		$scope.errorMsg = true;
	        $scope.errormessage = "End Date/Time should be greater than Start Date/Time";
	        
    	}
    	else
    	{
    		$scope.errorMsg = false;
    		$scope.errormessage ="";
    	}
    	}
    }
    $scope.addUser = function() {
    	console.log($scope.guestList);
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	
    	if($scope.guestList !== null && typeof $scope.guestList !== 'undefined' && $scope.guestList.length > 0)
    	{
    		$scope.guestRep = [];
    		$scope.guestRep = $scope.guestList.replace(/\n/g, ",").split(/[ ,]+/);
    		for(var i=0;i<$scope.guestRep.length;i++)
    		{
    			if(re.test($scope.guestRep[i]))
    			{
    			$scope.guests.push($scope.guestRep[i]);
    			}
    		}
    		$scope.guestList = "";
    	}
    }
    $scope.removeUser = function(guest) {
    	if(guest !== null)
    	{
    		var index = $scope.guests.indexOf(guest);
    		$scope.guests.splice(index, 1);
    	}
    }
    $scope.addEvent = function() 
    {
    	var postsRef = ref.child(userid);
    	var newpostref = postsRef.push();
		newpostref.set({
			
			eventname: $scope.name,
			eventtype: $scope.eventTyp,
			orgname: $scope.orgname,
			orgloc: $scope.orgLoc,
			startdate: $scope.startDate.toString().split('GMT')[0],
			enddate: $scope.endDate.toString().split('GMT')[0],
			guestEmail: $scope.guests
			
		});
		//ref.push().set(event);
    	$state.go('eventView');
	}
  }]);
