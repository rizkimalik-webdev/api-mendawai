'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const logger = require('../helper/logger');
const response = require('../helper/json_response');


const join_chat = async function (req) {
    try {
        const { user_id, username, email } = req;
        const now = new Date();
        const chatid = date.format(now, 'YYYYMMDDHHmmSSSmmSSS');
        const { customer_id } = await knex('customers').where({ email }).first();
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

        await knex('chats').where({ email }).update({ user_id });
        const result = await knex('chats').where({ customer_id }).first();

        return result;
    }
    catch (error) {
        console.log(error);
        logger('sosmed/join_chat', error);
    }
}

const insert_message_customer = async function (req) {
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

        const { date_assign } = await knex('chats').select('date_assign').where({ email }).first();
        await knex('chats').where({ email, flag_to: 'customer' }).whereNot({ user_id }).update({ user_id });

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
                date_assign: date_assign,
                // page_id: '',
                // post_id: '',
                // comment_id: '',
                // reply_id: ''
            }]);

    }
    catch (error) {
        console.log(error);
        logger('sosmed/insert_message_customer', error);
    }
}

const insert_message_agent = async function (req) {
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

        const { date_assign } = await knex('chats').select('date_assign').where({ chat_id, customer_id }).first();

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
                flag_to: 'agent',
                status_chat: 'open_chat',
                flag_end: 'N',
                date_create: knex.fn.now(),
                date_assign: date_assign,
                // page_id: '',
                // post_id: '',
                // comment_id: '',
                // reply_id: ''
            }]);

    }
    catch (error) {
        console.log(error);
        logger('sosmed/insert_message_agent', error);
    }
}

const list_customers = async function (req, res) {
    const res_list_customers = await knex('chats')
        .select('chat_id', 'user_id', 'customer_id', 'name', 'email', 'flag_to', 'channel', 'page_id', 'post_id', 'comment_id', 'reply_id')
        .groupBy('chat_id', 'user_id', 'customer_id', 'name', 'email', 'flag_to', 'channel', 'page_id', 'post_id', 'comment_id', 'reply_id')
        .where({ flag_to: 'customer', flag_end: 'N' })

    for (let i = 0; i < res_list_customers.length; i++) {
        const { date_create } = await knex('chats').select('date_create').where({ flag_to: 'customer', flag_end: 'N', chat_id: res_list_customers[i].chat_id }).orderBy('id', 'desc').first();
        res_list_customers[i].date_create = date_create.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // res_list_customers[i].date_create = date.format(date_create, 'hh:mm DD MMM YYYY');
    }

    response.ok(res, res_list_customers.reverse());
}

const conversation_chats = async function (req, res) {
    const { chat_id } = req.body;
    const res_conversations = await knex('chats')
        .where({ chat_id, flag_end: 'N' })
        .orderBy('id', 'asc')

    for (let i = 0; i < res_conversations.length; i++) {
        res_conversations[i].date_create = res_conversations[i].date_create.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // res_conversations[i].date_create = date.format(res_conversations[i].date_create, 'YYYY-MM-DD HH:mm:ss')
    }
    response.ok(res, res_conversations);
}

const end_chat = async function (req, res) {
    const { chat_id } = req.body;
    const res_endchat = await knex.raw(`
        UPDATE chats SET flag_end='Y' WHERE chat_id=${chat_id}
		INSERT INTO chats_end SELECT * FROM chats WHERE flag_end='Y'
		DELETE chats WHERE flag_end='Y'
    `);
    response.ok(res, res_endchat);
}

module.exports = {
    list_customers,
    join_chat,
    insert_message_customer,
    insert_message_agent,
    conversation_chats,
    end_chat,
}
