'use strict';

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log(socket.id);

        socket.on('join-room', room => {
            socket.join(room)
        })

        socket.on('send-message', (res, room) => {
            console.log(room);
            // socket.broadcast.emit('return-message', res);

            if (room === ""){
                socket.broadcast.emit('return-message', res);
            }
            else {
                socket.to(room).emit('return-message', res)
            }
        });

    
        socket.on('disconnect', (res) => {
            console.log(res);
        });
    });

}