/**
 * Created by Justin on 7/24/2015.
 */
angular.module('users').factory('Authentication', [
    function(){
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);