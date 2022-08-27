'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const logger = require('../helper/logger');
const response = require('../helper/json_response');

//? HTTP FUNCTION
const join_chat = async function (req, res) {
    try {
        const data = req.body;

        if (data.email && data.flag_to === 'customer') {
            const result = await customer_join(data);
            response.ok(res, result);
        }
        else if (data.username && data.flag_to === 'Layer1') {
            const result = await agent_join(data);
            response.ok(res, result);
        }
        else {
            response.error(res, 'error', 'sosmed/join_chat');
        }

    }
    catch (error) {
        console.log(error);
        logger('sosmed/join_chat', error);
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


//? NON HTTP FUNCTION
const customer_join = async function (data) {
    const now = new Date();
    const generate_chatid = date.format(now, 'YYYYMMDDHHmmSSSmmSSS');
    const generate_customerid = date.format(now, 'YYMMDDHHmmSS');

    const customer = await knex('customers').select('customer_id').where({ email: data.email }).first();
    const customer_id = customer ? customer.customer_id : generate_customerid;

    if (!customer) {
        await knex('customers')
            .insert([{
                customer_id: customer_id,
                name: data.username,
                email: data.email,
                uuid: data.uuid,
                connected: data.connected,
                source: 'Chat',
                status: 'Initialize',
                created_at: knex.fn.now()
            }]);
    }
    else {
        await knex('customers').update({ uuid: data.uuid, connected: data.connected }).where({ email: data.email });
    }

    const chat = await knex('chats').select('chat_id')
        .where({
            email: data.email,
            flag_to: 'customer',
            status_chat: 'waiting',
            flag_end: 'N',
            channel: 'Chat',
        }).first();

    const chat_id = chat ? chat.chat_id : generate_chatid;
    if (!chat) {
        await knex('chats')
            .insert([{
                chat_id: chat_id,
                message: 'Joined Chat',
                name: data.username,
                email: data.email,
                channel: 'Chat',
                customer_id: customer_id,
                flag_to: 'customer',
                status_chat: 'waiting',
                flag_end: 'N',
                date_create: knex.fn.now()
            }]);
    }

    // get result data & send
    const result = await knex('chats')
        .where({
            email: data.email,
            flag_to: 'customer',
            status_chat: 'waiting',
            flag_end: 'N',
            channel: 'Chat',
        }).first();

    if (result) {
        const user = await knex('users').select('uuid').where({ username: result.agent_handle }).first();
        const cust = await knex('customers').select('uuid').where({ email: data.email }).first();
        result.uuid_agent = user.uuid;
        result.uuid_customer = cust.uuid;
    }

    return result;
}

const agent_join = async function (data) {
    const user = await knex('users').select('username').where({ username: data.username }).first();

    if (user) {
        await knex('users')
            .update({ uuid: data.uuid, connected: data.connected, login: '1' })
            .where({ username: data.username, user_level: 'Layer1' });
    }

    return user;
}

const send_message_customer = async function (req) {
    try {
        const {
            chat_id,
            customer_id,
            name,
            email,
            message,
            agent_handle
        } = req;

        await knex('chats')
            .insert([{
                chat_id,
                customer_id,
                name,
                email,
                message,
                agent_handle,
                channel: 'Chat',
                flag_to: 'customer',
                status_chat: 'open',
                flag_end: 'N',
                date_create: knex.fn.now()
            }]);

    }
    catch (error) {
        console.log(error);
        logger('sosmed/send_message_customer', error);
    }
}

const send_message_agent = async function (req) {
    try {
        const {
            chat_id,
            customer_id,
            name,
            email,
            message,
            agent_handle
        } = req;

        await knex('chats')
            .insert([{
                chat_id,
                customer_id,
                name,
                email,
                message,
                agent_handle,
                channel: 'Chat',
                flag_to: 'agent',
                status_chat: 'open',
                flag_end: 'N',
                date_create: knex.fn.now()
            }]);

    }
    catch (error) {
        console.log(error);
        logger('sosmed/send_message_agent', error);
    }
}

const update_socket = async function (data) {
    if (data.flag_to === 'customer') {
        await knex('customers')
            .update({ uuid: data.uuid, connected: data.connected })
            .where({ email: data.email });
    }
    else {
        await knex('users')
            .update({ uuid: data.uuid, connected: data.connected })
            .where({ username: data.username, user_level: 'Layer1' });
    }
}

module.exports = {
    list_customers,
    join_chat,
    send_message_customer,
    send_message_agent,
    conversation_chats,
    end_chat,
    update_socket,
}
