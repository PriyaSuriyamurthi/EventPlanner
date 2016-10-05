(function() {
    "use strict";

    /**
     * @ngdoc function
     * @name eventPlannerApp.controller:EventcreateCtrl
     * @description
     * # EventcreateCtrl
     * Controller of the eventPlannerApp
     */
    angular.module('eventPlannerApp')
        .controller('EventcreateCtrl', ['$scope', '$state', function($scope, $state) {
            var vm = this;
            vm.page = 1;
            var today = new Date();
            $scope.guests = [];
            var ref = firebase.database().ref();
            var startTimestamp;
            var endTimestamp;
            $('#name').focus();
            $scope.updateEndDate = function() {

                startTimestamp = new Date($scope.startDate);

                if (startTimestamp < today) {
                    $scope.errorMsg = true;
                    $scope.errormessage = "Start Date cannot be past";

                } else {
                    $scope.errorMsg = false;
                    $scope.errormessage = "";
                }
                if (startTimestamp && endTimestamp) {
                    if (endTimestamp < startTimestamp) {
                        $scope.errorMsg = true;
                        $scope.errormessage = "End Date/time should be greater than start date/time";

                    } else {
                        $scope.errorMsg = false;
                        $scope.errormessage = "";
                    }
                }
            };
            $scope.checkEndDate = function() {

                endTimestamp = new Date($scope.endDate);
                if (startTimestamp && endTimestamp) {
                    if (endTimestamp < startTimestamp) {
                        $scope.errorMsg = true;
                        $scope.errormessage = "End Date/time should be greater than start date/time";

                    } else {
                        $scope.errorMsg = false;
                        $scope.errormessage = "";
                    }
                }
            };
            $scope.addUser = function() {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if ($scope.guestList !== null && typeof $scope.guestList !== 'undefined' && $scope.guestList.length > 0) {
                    $scope.guestRep = [];
                    var emailList = [];
                    $scope.errorMsg = false;
                    $scope.guestRep = $scope.guestList.replace(/\n/g, ",").split(/[ ,]+/);
                    for (var i = 0; i < $scope.guestRep.length; i++) {
                        if (re.test($scope.guestRep[i])) {
                            //$scope.errorMsg = false;
                            //$scope.errormessage = "";
                            emailList.push($scope.guestRep[i]);
                            //$scope.guests.push($scope.guestRep[i]);
                            //$scope.guestList = "";
                        } else {
                            $scope.errorMsg = true;
                            $scope.errormessage = "Email invalid";
                            break;
                        }
                    }
                    if ($scope.errorMsg === false) {
                        $scope.errorMsg = false;
                        $scope.errormessage = "";
                        for (var i = 0; i < emailList.length; i++) {
                            $scope.guests.push(emailList[i]);
                        }
                        $scope.guestList = "";
                    }

                }
            };
            $scope.removeUser = function(guest) {
                if (guest !== null) {
                    var index = $scope.guests.indexOf(guest);
                    $scope.guests.splice(index, 1);
                }
            };
            $scope.addEvent = function() {
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
                $state.go('eventView');
            };
        }]);
})();