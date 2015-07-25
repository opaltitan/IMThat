/**
 * Created by Justin on 7/24/2015.
 */
var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'home', 'chat','rooms']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider){
        $locationProvider.hashPrefix('!');
    }
]);

if(window.location.hash === '#_=_') window.location.hash = "#!";

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});