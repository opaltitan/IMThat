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
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', users.signout);
};