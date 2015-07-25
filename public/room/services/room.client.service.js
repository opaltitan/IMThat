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
}]);