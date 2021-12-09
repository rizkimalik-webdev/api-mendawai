'use strict';

const { insert_customer } = require("../controller/customer_controller");

//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat

module.exports = function (io) {
    //? middleware auth.username
    io.use((socket, next) => {
        const { user_flag, username, email } = socket.handshake.auth;
        if (!username) {
            return next(
                delete socket.id
                // console.log(`${socket.id} - invalid username`)
            );
        }
        socket.username = username;
        if (user_flag === 'customer' && email !== undefined) {
            console.log(user_flag, username, email);
            const customer = { username, email }
            insert_customer(customer)
        }
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
            console.log(`joined: ${res.room}`);
            socket.join(res.room)
        });


        socket.on('disconnect', (res) => {
            delete users[socket.id];
            console.log(`${socket.id} - ${res}`);
        });
    });

}