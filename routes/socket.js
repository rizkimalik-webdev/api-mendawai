'use strict';

const { insert_customer_sosmed } = require("../controller/customer_controller");
const { join_chat, insert_message_customer, insert_message_agent } = require("../controller/sosmed_controller");

//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat
module.exports = function (io) {
    //? middleware auth.username
    io.use((socket, next) => {
        const { flag_to, username, email } = socket.handshake.auth;
        if (!username) {
            const err = new Error("not authorized");
            next(err);
            console.log(`⛔[${flag_to}]${username} - ${email} : ID ${socket.id}, not authorized`);
        }

        socket.username = username;
        if (flag_to === 'customer' && email !== undefined) {
            insert_customer_sosmed({
                name: username,
                email: email
            })
        }
        next();
        console.log(`✅[${flag_to}]${username} - ${email} : ID ${socket.id}, auth success`);
    });

    io.on('connection', (socket) => {
        let users = {}
        users[socket.id] = socket.id;

        socket.on('send-message-agent', (content) => {
            // console.log(`message-agent : ` + JSON.stringify(content));
            socket.to(content.socket_custid).emit('return-message-agent', content);
            insert_message_agent(content);
        });

        socket.on('send-message-customer', (content) => {
            socket.to(content.socket_agentid).emit('return-message-customer', content);
            if (content.blending === true) return;
            insert_message_customer(content);
        });


        socket.on('join-chat', (content) => {
            if (content.flag_to === 'customer') {
                join_chat(content).then((val) => {
                    // socket.join(val.chat_id);
                    socket.to(val.user_id).emit('return-join-chat', val);
                    console.log(`${val.email}, join chat: ${val.chat_id}`);
                });
            }
            else {
                // socket.join(content.chat_id);
                socket.join(socket.id);
                console.log(`${content.email}, join chat: ${content.chat_id}`);
            }
            console.log(socket.rooms);
        });

        socket.on('blending-chat', (content) => {
            socket.to(content.user_id).emit('return-blending-chat', content);
        });


        socket.on('disconnect', (res) => {
            const { username, flag_to, email } = socket.handshake.auth;
            delete users[socket.id];
            console.log(`⛔[${flag_to}]${username} - ${email} : ID ${socket.id}, ${res} `);
        });
    });

}