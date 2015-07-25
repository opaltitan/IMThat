/**
 * Created by Justin on 7/24/2015.
 */
angular.module('rooms').controller('RoomController', ['$scope', '$routeParams', '$location', 'Authentication', 'Rooms',
    function($scope, $routeParams, $location, Authentication, Rooms){
        $scope.authentication = Authentication;

        $scope.create = function(){
            var room = new Rooms({
                roomname: this.roomname
            });
            room.$save(function(response){
                $location.path('rooms/' + response._id);
            }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.rooms = Rooms.query();
        };
        $scope.findOne = function() {
            $scope.room = Rooms.get({
                roomId: $routeParams.roomId
            });
        };

        $scope.update = function(){
            $scope.room.$update(function(){
                $location.path('rooms/' + $scope.room._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(room){
            if(room){
                room.$remove(function() {
                    for(var i in $scope.rooms){
                        if($scope.rooms[i] === room){
                            $scope.rooms.splice(i,1);
                        }
                    }
                });
            } else {
                $scope.room.$remove(function(){
                    $location.path('rooms');
                });
            }
        };
    }
]);