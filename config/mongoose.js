/**
 * Created by Justin on 7/24/2015.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../models/user.server.model');
    require('../models/room.server.model');
    return db;
};