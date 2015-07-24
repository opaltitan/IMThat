/**
 * Created by Justin on 7/24/2015.
 */
angular.module('chat').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/chat', {
                templateUrl: 'chat/views/chat.client.view.html'
            });
    }
]);