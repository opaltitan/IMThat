/**
 * Created by Justin on 7/24/2015.
 */
var Room = require('mongoose').model('Room'),
    User = require('mongoose').model('User');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Room name already exists';
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

// Creates a new 'room', and responds with the created room data as JSON.
exports.create = function(req, res){
    var room = new Room(req.body);
    room.createdUser = req.user;
    room.members.push(req.body.member);
    room.save(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(room);
        }
    });
};

// Lists all rooms that are either "public" rooms, or rooms for which the user either created or is a member of
exports.list = function(req, res) {
    var reqUser = req.user;

    Room.find()
        .or([{ privacyDesignation: 'public'}, { 'members._id': reqUser }, { createdUser: reqUser}])
        .sort('-created')
        .populate('members._id')
        .populate('createdUser', 'firstName lastName')
        .exec(function(err, rooms){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(rooms);
        }
    });
};

// Returns all room data for the passed room 'id'
exports.roomById = function(req, res, next, id) {
    Room.findById(id)
        .populate('createdUser', 'firstName lastName')
        //.populate('members._id', 'firstName lastName')
        .exec(function(err, room){
        if(err) return next(err);
        if(!room) return next(new Error('Failed to load room ' + id));
        req.room = room;
        next();
    });
};

// Responds with the room data as JSON
exports.read = function(req, res) {
    res.json(req.room);
};

// Updates the room data from the client
exports.update = function(req, res) {
    var room = req.room;
    room.roomname = req.body.roomname;
    room.privacyDesignation = req.body.privacyDesignation;
    if(req.body.member_new){room.members.push(req.body.member_new);}
    room.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(room);
        }
    });
};

// Deletes the passed room
exports.delete = function(req, res){
  var room = req.room;
    room.remove(function(err){
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(room);
        }
    });
};


