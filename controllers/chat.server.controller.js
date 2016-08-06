/**
 * Created by Justin on 7/24/2015.
 */

module.exports = function(io, socket){
    // Emits the "user connect" message whenever a user joins the chat room
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });
    // If a "chatMessage" event is emitted to the server by one of the client browsers, the server emits the "chatMessage" to all other connected browsers.
    socket.on('chatMessage', function(message){
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;
        io.emit('chatMessage', message);
    });
    // If a "disconnect" event is emitted (any user leaves a chat room) by one of the client browsers, the server emits the "chatMessage" event to all other connected browsers.
    socket.on('disconnect', function(){
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};