/**
 * Created by Justin on 7/24/2015.
 */
angular.module('rooms').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/rooms', {
                templateUrl: 'room/views/room-list.client.view.html'
            }).
            when('/rooms/create', {
                templateUrl: 'room/views/room-create.client.view.html'
            }).
            when('/rooms/:roomId', {
                templateUrl: 'room/views/room-view.client.view.html'
            }).
            when('/rooms/:roomId/edit', {
                templateUrl: 'room/views/room-edit.client.view.html'
            });
    }
]);