/**
 * Created by Justin on 7/24/2015.
 */
// do not think this file is necessary, just a placeholder for now.

var rooms = require('../controllers/room.server.controller'),
    users = require('../controllers/users.server.controller');

module.exports = function(app){
    app.route('/api/rooms')
        // On 'get' request, returns the list of rooms
        .get(rooms.list)
        // On 'post' request, verifies that the user is authenticated before creating the room.
        .post(users.requiresLogin, rooms.create);
    app.route('/api/rooms/:roomId')
        // On 'get' request, returns the room data for the passed 'id'
        .get(rooms.read)
        // On 'put' request, verifies that the user is authenticated before updating the passed room data.
        .put(users.requiresLogin, rooms.update)
        // On 'delete' request, verifies that the user is authenticated before deleting the room.
        .delete(users.requiresLogin, rooms.delete);
    app.route('/api/rooms/:roomId/chat')
        // On 'get' request, returns the room data when user enters the "chat" portion of the room.
        .get(rooms.read);
    // Populates the 'room' data for the passed 'room' id parameter.
    app.param('roomId', rooms.roomById);
};