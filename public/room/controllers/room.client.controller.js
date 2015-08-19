/**
 * Created by Justin on 7/24/2015.
 */
angular.module('rooms').controller('RoomController', ['$scope', '$routeParams', '$location', 'Authentication', 'Rooms', 'Socket', 'Users',
    function($scope, $routeParams, $location, Authentication, Rooms, Socket, Users){
        $scope.authentication = Authentication;
        $scope.users = Users.query();
        $scope.visible = false;

        $scope.create = function(){
            var room = new Rooms({
                roomname: this.roomname,
                privacyDesignation: this.privacyDesignation,
                member: this.member
            });
            room.$save(function(response){
                $location.path('rooms/' + response._id);
            }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.rooms = Rooms.query();
           // $scope.users = Users.list();
        };
        $scope.findOne = function() {
            $scope.room = Rooms.get({
                roomId: $routeParams.roomId
            });
        };

        $scope.update = function(){
            $scope.room.members.push($scope.room.member_new);
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

        $scope.messages = [];
        Socket.on('chatMessage', function(message){
            if(message.roomname === $scope.room.roomname) {
                $scope.messages.push(message);
            }
        });
        $scope.sendMessage = function(){
            var message = {
                text: this.messageText,
                roomname: $scope.room.roomname
            };
            Socket.emit('chatMessage', message);
            this.messageText = '';
        };
        $scope.$on('$destroy', function(){
            Socket.removeListener('chatMessage');
        });

    }
]);