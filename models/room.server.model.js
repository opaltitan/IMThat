/**
 * Created by Justin on 7/24/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var RoomSchema = new schema ({
    roomname: {
       type: String,
       trim: true,
       unique: true,
       required: 'Room name required.'
    },
    created:{
        type: Date,
        default: Date.now
    },
    createdUser: {
        type: schema.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Room', RoomSchema);