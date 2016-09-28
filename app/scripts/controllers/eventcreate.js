'use strict';

/**
 * @ngdoc function
 * @name eventPlannerApp.controller:EventcreateCtrl
 * @description
 * # EventcreateCtrl
 * Controller of the eventPlannerApp
 */
angular.module('eventPlannerApp')
  .controller('EventcreateCtrl',['$scope',function ($scope) {
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
    		start = start.getFullYear() + "-" + month + "-"+ start.getDate() +"T" +start.getHours() + ":" + minutes +":" + start.getSeconds();
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
    	console.log(startdate);
    	console.log(enddate);
    	if((stHour+stMin > enHour+enMin) || (startdate > enddate))
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
    	if($scope.guestList !== null && typeof $scope.guestList !== 'undefined')
    	{
    		$scope.guestRep = [];
    		$scope.guestRep = $scope.guestList.replace(/\n/g, ",").split(/[ ,]+/);
    		for(var i=0;i<$scope.guestRep.length;i++)
    		{
    			$scope.guests.push($scope.guestRep[i]);
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
    	console.log($scope.startDate);
    	console.log($scope.endDate);
		var event ={
			eventname: $scope.name,
			eventtype: $scope.eventTyp,
			orgname: $scope.orgname,
			orgloc: $scope.orgLoc,
			startdate: $scope.startDate,
			enddate: $scope.endDate,
			guestEmail: $scope.guests
		}
		ref.push(event);
    	
	}
  }]);
