/**
 * Created by Justin on 7/24/2015.
 */
angular.module('home').controller('HomeController', ['$scope', 'Authentication',
    function($scope, Authentication){
        $scope.authentication = Authentication;
    }
]);