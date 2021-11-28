'use strict';
//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log(socket.id);

        socket.on('join-room', (res) => {
            console.log(`${res.username} ${socket.id} - joined: ${res.room_id}`);
            socket.join(res.room_id)
        });

        socket.on('send-message', (res) => {
            const json = JSON.stringify(res);
            console.log('message: '+ json);

            socket.to(res.room).emit('return-message', res)
            // socket.broadcast.emit('return-message', res);

            // if (room === ""){
            //     socket.broadcast.emit('return-message', res);
            // }
            // else {
            //     socket.to(room).emit('return-message', res)
            // }
        });

    
        socket.on('disconnect', (res) => {
            console.log(`${socket.id} - ${res}`);
        });
    });

}