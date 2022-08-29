'use strict';

const { send_message_customer, send_message_agent, update_socket } = require("../controller/sosmed_controller");

//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat
module.exports = function (io) {
    //? middleware auth.username
    io.use((socket, next) => {
        const { flag_to, username, email } = socket.handshake.auth;
        // if (!username) {
        //     const err = new Error("not authorized");
        //     next(err);
        //     // console.log(`⛔[${flag_to}]${username} - ${email} : ID ${socket.id}, not authorized`);
        // }
        // else {
        socket.username = username;
        socket.flag_to = flag_to;
        socket.email = email;
        next();
        console.log(`✅[${flag_to}] ${username} - ${email} : ID ${socket.id}, auth success`);
        // }
    });

    io.on('connection', (socket) => {
        let users = {}
        users[socket.id] = socket.id;

        socket.on('join-chat', (data) => {
            if (data.flag_to === 'customer') {
                socket.to(data.uuid_agent).emit('return-join-chat', data);
            } else {
                socket.to(data.uuid_customer).emit('return-join-chat', data);
            }
            console.log(`${val.email}, join chat: ${val.chat_id}`);
        });

        socket.on('send-message-customer', (data) => {
            socket.to(data.uuid_agent).emit('return-message-customer', data);
            if (data.status_chat === 'waiting') return;
            send_message_customer(data);
        });

        socket.on('send-message-agent', (data) => {
            // console.log(`message-agent : ` + JSON.stringify(data));
            socket.to(data.uuid_customer).emit('return-message-agent', data);
            send_message_agent(data);
        });


        socket.on('queing', (data) => {
            socket.to(data.uuid_customer).emit('return-queing', data);
            // if (data.flag_to === 'customer') {
            // socket.to(data.uuid_customer).emit('return-queing', data);
            // } else {
            //     socket.to(data.uuid_agent).emit('return-queing', data);
            // }
        });

        socket.on('typing', (data) => {
            if (data.flag_to === 'customer') {
                socket.to(data.uuid_agent).emit('return-typing', data);
            } else {
                socket.to(data.uuid_customer).emit('return-typing', data);
            }
        });

        socket.on('reconnect', (data) => {
            console.log(`recconnect ${data.email}`)
            update_socket(data);

            if (data.flag_to === 'customer') {
                socket.to(data.uuid_customer).emit('return-reconnect', data);
            } else {
                socket.to(data.uuid_agent).emit('return-reconnect', data);
            }
        });


        socket.on('disconnect', (res) => {
            const { username, flag_to, email } = socket.handshake.auth;
            if (username || email) {
                update_socket({ username, flag_to, email, uuid: socket.id, connected: socket.connected });
            }
            delete users[socket.id];
            console.log(`⛔[${flag_to}] ${username} - ${email} : ID ${socket.id}, connected:${socket.connected}, ${res} `);
        });
    });

}