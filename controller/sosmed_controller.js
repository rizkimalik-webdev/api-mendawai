'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const logger = require('../config/logger');
const response = require('../helper/json_response');

const join_chat = async function (req) {
    try {
        const { user_id, username, email } = req;
        const now = new Date();
        const chatid = date.format(now, 'YYYYMMDDHHmmSSSmmSSS');
        const { customer_id } = await knex('customers').where('email', email).first();
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
                    name: username,
                    email: email,
                    channel: 'Chat',
                    customer_id: customer_id,
                    flag_to: 'customer',
                    status_chat: 'waiting',
                    flag_end: 'N',
                    date_create: knex.fn.now()
                }]);
        }
        else {
            await knex('chats').where({ email }).update({ user_id });
        }
        const result = await knex('chats').where({ customer_id }).first();

        return result;
    }
    catch (error) {
        console.log(error);
        logger('sosmed/join_chat', error);
    }
}

const conversation_customer = async function (req) {
    try {
        const {
            chat_id,
            customer_id,
            user_id,
            name,
            email,
            message,
            agent_handle
        } = req;

        await knex('chats')
            .insert([{
                chat_id,
                customer_id,
                user_id,
                name,
                email,
                message,
                agent_handle,
                channel: 'Chat',
                flag_to: 'customer',
                status_chat: 'open_chat',
                flag_end: 'N',
                date_create: knex.fn.now(),
                date_assign: '',
                page_id: '',
                post_id: '',
                comment_id: '',
                reply_id: ''
            }]);

    }
    catch (error) {
        console.log(error);
        logger('sosmed/join_chat', error);
    }
}

const blending = async function (req, res) {
    const chat = await knex('chats')
        .select('chat_id')
        .where({
            agent_handle: null,
            status_chat: 'waiting',
            flag_to: 'customer',
            flag_end: 'N'
        }).first();

    if (chat) {
        await knex('chats')
            .update({ agent_handle: 'admin', date_assign: knex.fn.now() })
            .where({ chat_id: chat.chat_id })
    }
    response.ok(res, chat);
}

module.exports = {
    join_chat,
    conversation_customer,
    blending
}
