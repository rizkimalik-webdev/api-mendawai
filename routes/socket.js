'use strict';
//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat

module.exports = function (io) {
    io.use((socket, next) => { 
        //? middleware auth.username
        const username = socket.handshake.auth.username; 
        if (!username) {
            return next(
                console.log(`${socket.id} - invalid username`)
            ); 
        } 
        socket.username = username; 
        next(); 
    });

    io.on('connection', (socket) => {
        let users = {}
        users[socket.id] = socket;

        socket.on('send-message-agent', (content) => {
            socket.to(content.client_id).emit('return-message-agent', content);
            console.log(`message-agent : ` + JSON.stringify(content));

            // socket.broadcast.emit('return-message', res);
            // if (room === ""){
            //     socket.broadcast.emit('return-message', res);
            // }
            // else {
            //     socket.to(room).emit('return-message', res)
            // }
        });

        socket.on('send-message-client', (content) => {
            socket.to(content.agent_id).emit('return-message-client', content);
            console.log('message-client: ' + JSON.stringify(content));
        });


        socket.on('join-room', (res) => {
            console.log(`joined: ${res.room_id}`);
            socket.join(res.room_id)
        });


        socket.on('disconnect', (res) => {
            delete users[socket.id];
            console.log(`${socket.id} - ${res}`);
        });
    });

}