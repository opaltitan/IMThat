/**
 * Created by Justin on 7/24/2015.
 */
var users = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
        .get(users.renderSignUp)
        .post(users.signup);
    app.route('/signin')
        // On 'get' request, renders the 'sign-in' variables
        .get(users.renderSignin)
        // On 'post' request, "posts" a new session for the user.
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    // On 'get' request, sign out the user.
    app.get('/signout', users.signout);
    // On 'get' request, returns an array of all users.
    app.get('/api/users', users.list);
};