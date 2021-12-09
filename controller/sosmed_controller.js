'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const logger = require('../config/logger');

const join_chat = async function (req) {
    try {
        const { user_id,name, email } = req;
        const now = new Date();
        const chatid = date.format(now, 'YYYYMMDDHHmmSSSmmSSS');
        const {customer_id} = await knex('customers').where('email',email).first();
        const chat = await knex('chats')
            .select('chat_id')
            .where({
                email: email,
                flag_to: 'customer',
                flag_end: 'N'
            });
        const chat_id = chat.length === 0 ? chatid : chat.chat_id;
        if (chat.length === 0) {
            await knex('chats')
            .insert([{
                chat_id: chat_id,
                message: 'join chat',
                user_id: user_id,
                name: name,
                email: email,
                channel: 'Chat',
                customer_id: customer_id,
                flag_to: 'customer',
                status_chat: 'waiting',
                flag_end: 'N',
                date_create: knex.fn.now()
            }]);
        }
        else{
            await knex('chats').where({email}).update({user_id});
        }
    }
    catch (error) {
        console.log(error);
        logger('sosmed/join_chat', error);
    }
}

module.exports = {
    join_chat
}
