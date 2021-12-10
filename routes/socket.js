'use strict';

const { insert_customer } = require("../controller/customer_controller");
const { join_chat, conversation_customer } = require("../controller/sosmed_controller");

//? socket.broadcast.emit = public chat
//? socket.to(room).emit = private chat
module.exports = function (io) {
    //? middleware auth.username
    io.use((socket, next) => {
        const { user_flag, username, email } = socket.handshake.auth;
        if (!username) {
            return next(
                // delete socket.id
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
            socket.to(content.socket_custid).emit('return-message-agent', content);
            console.log(`message-agent : ` + JSON.stringify(content));
        });

        socket.on('send-message-client', (content) => {
            socket.to(content.socket_agentid).emit('return-message-client', content);
            console.log('message-client: ' + JSON.stringify(content));
            conversation_customer(content);
        });


        socket.on('join-chat', (content) => {
            console.log(`joined: ${content.username}`);
            join_chat(content).then((val) => {
                socket.to(content.user_id).emit('return-join-chat', val);
            });
            // socket.join(res.room)
        });


        socket.on('disconnect', (res) => {
            delete users[socket.id];
            console.log(`${socket.id} - ${res}`);
        });
    });

}