/**
 * Created by Justin on 7/24/2015.
 */

angular.module('rooms').factory('Rooms', ['$resource', function($resource){
    return $resource('api/rooms/:roomId', {
        roomId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}])
    .service('Socket', ['Authentication', '$location', '$timeout',
        function(Authentication, $location, $timeout){
            if(Authentication.user){
                this.socket = io();
            } else {
                $location.path('/');
            }
            this.on = function(eventName, callback){
                if(this.socket){
                    this.socket.on(eventName, function(data){
                        $timeout(function(){
                            callback(data);
                        });
                    });
                }
            };
            this.emit = function(eventName, data){
                if(this.socket){
                    this.socket.emit(eventName, data);
                }
            };
            this.removeListener = function(eventName){
                if(this.socket){
                    this.socket.removeListener(eventName);
                }
            };
        }
    ]);



