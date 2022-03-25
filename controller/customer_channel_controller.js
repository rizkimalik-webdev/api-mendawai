'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        // auth_jwt_bearer(req, res);
        const channels = await knex.select(
            'customer_channels.id',
            'customer_channels.customer_id',
            'customer_channels.flag_channel',
            'customer_channels.value_channel',
            'customers.name',
        )
            .from('customer_channels')
            .leftOuterJoin('customers', 'customer_channels.customer_id', 'customers.customer_id')
            .orderBy('customer_channels.customer_id');
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

const destroy_channel = async function (req, res) {
    try {
        const { customer_id } = req;
        await knex('customer_channels').where({ customer_id }).del();
    }
    catch (error) {
        console.log(error);
        logger('customer_channel/destroy', error);
    }
}

module.exports = {
    index,
    insert_channel_customer,
    destroy_channel,
}