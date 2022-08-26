'use strict';

const { send_message_customer, send_message_agent } = require("../controller/sosmed_controller");

//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat
module.exports = function (io) {
    //? middleware auth.username
    io.use((socket, next) => {
        const { flag_to, username, email } = socket.handshake.auth;
        if (!username) {
            const err = new Error("not authorized");
            next(err);
            // console.log(`⛔[${flag_to}]${username} - ${email} : ID ${socket.id}, not authorized`);
        }
        else {
            socket.username = username;
            next();
            console.log(`✅[${flag_to}]${username} - ${email} : ID ${socket.id}, auth success`);
        }
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
            // if (data.blending === true) return;
            // send_message_customer(data);
        });

        socket.on('send-message-agent', (data) => {
            // console.log(`message-agent : ` + JSON.stringify(data));
            socket.to(data.uuid_customer).emit('return-message-agent', data);
            // send_message_agent(data);
        });


        socket.on('blending-chat', (data) => {
            socket.to(data.user_id).emit('return-blending-chat', data);
        });
        
        socket.on('recconnect', (data) => {
            console.log(data)
            socket.to(data.user_id).emit('return-reconnect', data);
        });


        socket.on('disconnect', (res) => {
            const { username, flag_to, email } = socket.handshake.auth;
            delete users[socket.id];
            console.log(`⛔[${flag_to}]${username} - ${email} : ID ${socket.id}, ${res} `);
        });
    });

}