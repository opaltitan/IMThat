/**
 * Created by Justin on 7/24/2015.
 */
angular.module('chat').controller('ChatController', ['$scope', 'Socket',
    function($scope, Socket){
        $scope.messages = [];
        Socket.on('chatMessage', function(message){
            if(message.roomname === $scope.room.roomname) {
                $scope.messages.push(message);
            }
        });
        $scope.sendMessage = function(){
            var message = {
                text: this.messageText + ":" + this.roomname,
                roomname: this.roomname
            };
            Socket.emit('chatMessage', message);
            this.messageText = '';
        };
        $scope.$on('$destroy', function(){
            Socket.removeListener('chatMessage');
        });
    }
]);