(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name eventPlannerApp.controller:EventviewCtrl
     * @description
     * # EventviewCtrl
     * Controller of the eventPlannerApp
     */
    angular.module('eventPlannerApp')
        .controller('EventviewCtrl', ['$scope', function($scope) {
            var ref = firebase.database().ref();
            var vm = this;
            var eventlist = [];
            var fref = ref.child(userid);
            fref.on("child_added", function(snapshot) {
                var data = snapshot.val();
                eventlist.push(data);
            });
            vm.event = eventlist;
            $scope.updateModal = function(eventid) {

                $scope.eventtype = vm.event[eventid].eventtype;
                $scope.orgname = vm.event[eventid].orgname;
                $scope.orgloc = vm.event[eventid].orgloc;
                $scope.startdate = vm.event[eventid].startdate;
                $scope.enddate = vm.event[eventid].enddate;
                $scope.description = vm.event[eventid].description;
                $scope.guestEmail = vm.event[eventid].guestEmail;
            }
        }]);
})();