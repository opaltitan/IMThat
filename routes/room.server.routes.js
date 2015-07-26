/**
 * Created by Justin on 7/24/2015.
 */
// do not think this file is necessary, just a placeholder for now.

var rooms = require('../controllers/room.server.controller'),
    users = require('../controllers/users.server.controller');

module.exports = function(app){
    app.route('/api/rooms')
        .get(rooms.list)
        .post(users.requiresLogin, rooms.create);
    app.route('/api/rooms/:roomId')
        .get(rooms.read)
        .put(users.requiresLogin, rooms.update)
        .delete(users.requiresLogin, rooms.delete);
    app.route('/api/rooms/:roomId/chat')
        .get(rooms.read);
    app.param('roomId', rooms.roomById);
};