'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const channels = await knex('customer_channels')
            .select('id','customer_id', 'flag_channel', 'value_channel')
            .orderBy('customer_id');
        for (let i = 0; i < channels.length; i++) {
            const { name } = await knex('customers').select('name')
                .where({ customer_id: channels[i].customer_id })
                .first();
            channels[i].name = name;
        }
        response.ok(res, channels);
    }
    catch (error) {
        console.log(error);
        logger('customer_channel/index', error);
        res.status(500).end();
    }
}

const insert_channel_customer = async function (req) {
    try {
        const { customer_id, email, telephone } = req;
        const check_email = await knex('customer_channels').where({ value_channel: email });
        if (check_email.length === 0) {
            await knex('customer_channels')
                .insert([{
                    customer_id,
                    flag_channel: 'Email',
                    value_channel: email,
                    created_at: knex.fn.now()
                }]);
        }
        const check_phone = await knex('customer_channels').where({ value_channel: telephone });
        if (check_phone.length === 0) {
            await knex('customer_channels')
                .insert([{
                    customer_id,
                    flag_channel: 'Phone',
                    value_channel: telephone,
                    created_at: knex.fn.now()
                }]);
        }
    }
    catch (error) {
        console.log(error);
        logger('customer_channel/store', error);
    }
}

module.exports = {
    index,
    insert_channel_customer,
}