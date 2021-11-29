'use strict';
//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat

module.exports = function (io) {
    let clients = {}

    //? middleware auth.username
    io.use((socket, next) => { 
        const username = socket.handshake.auth.username; 
        if (!username) {
            return next(
                console.log(`${socket.id} ${username} - invalid username`)
            ); 
        } 
        else{
            console.log(`${socket.id} ${username}`);
        }
        socket.username = username; 
        next(); 
    });

    io.on('connection', (socket) => {
        clients[socket.id] = socket;

        socket.on('send-message', (content) => {
            const json = JSON.stringify(content);
            console.log(`message : ` + json);

            socket.to(content.to).emit('return-message', content);

            // socket.to(res.room).emit('return-message', res)
            // socket.broadcast.emit('return-message', res);
            // if (room === ""){
            //     socket.broadcast.emit('return-message', res);
            // }
            // else {
            //     socket.to(room).emit('return-message', res)
            // }
        });

        socket.on('join-room', (res) => {
            console.log(`${res.username} ${socket.id} - joined: ${res.room_id}`);
            socket.join(res.room_id)
        });

        socket.on('send-message-client', (res) => {
            const json = JSON.stringify(res);
            console.log('message-client: ' + json);
            socket.to(res.room).emit('return-message-client', res);
        });


        socket.on('disconnect', (res) => {
            delete clients[socket.id];
            console.log(`${socket.id} - ${res}`);
        });
    });

}