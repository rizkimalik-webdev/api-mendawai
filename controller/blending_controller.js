'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const logger = require('../config/logger');
const response = require('../helper/json_response');


const blending = async function (req, res) {
    try {
        const chat = await knex('chats')
            .select('chat_id')
            .where({
                agent_handle: null,
                status_chat: 'waiting',
                flag_to: 'customer',
                flag_end: 'N'
            }).first();
        const { username } = await knex('users')
            .select('username')
            .where({
                user_level: 'Agent',
                login: 1,
                chat: true
            })
            .first();

        if (chat && username) {
            await knex('chats')
                .update({ agent_handle: username, date_assign: knex.fn.now() })
                .where({ chat_id: chat.chat_id })
        }
        
        response.ok(res, chat);
    } catch (error) {
        console.log(error);
        logger('sosmed/blending', error);
    }
}

module.exports = {
    blending
}
