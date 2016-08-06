/**
 * Created by Justin on 7/24/2015.
 */
var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for(var errName in err.errors){
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

// Renders the sign-in page variables if the user is not authenticated.
exports.renderSignin = function(req, res, next){
    if(!req.user){
        res.render('signin',{
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

// Renders the sign-up page variables if the user is not authenticated.
exports.renderSignUp = function(req, res, next){
    if(!req.user){
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

// Creates a new user
exports.signup = function(req, res, next){
    if(!req.user){
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err){
            if(err){
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function(err){
                if(err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

// Signs out the user
exports.signout = function(req, res){
    req.logout();
    res.redirect('/');
};

// Lists all users
exports.list = function(req, res, next){
    User.find({}, 'username email', function(err, users){
        if(err){
            return next(err);
        } else {
            res.json(users);
        }
    });
};
/*
 exports.create = function(req, res, next) {
 var user = new User(req.body);
 User.save(function(err) {
 if(err){
 return next(err);
 } else {
 res.json(user);
 }
 });
 };*/
// Responds with users data as JSON
exports.read = function(req, res) {
    res.json(req.user);
};

// Finds the specific user from the id
exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if(err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

// Updates the data for the specified user.
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if(err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};

// Deletes the specified user.
exports.delete = function(req, res, next) {
    req.user.remove(function(err){
        if(err){
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};

// Validation that the user is authenticated.
exports.requiresLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};
