'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const id = require('date-and-time/locale/id');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');
const datetime = require('../helper/datetime_format');

date.locale(id);

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const tickets = await knex('tickets');
        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/index', error);
        res.status(500).end();
    }
}


const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const now = new Date();
        const {
            customer_id,
            ticket_number = date.format(now, 'YYYYMMDDHHmmSSS'),
            group_ticket_number,
            ticket_source,
            status,
            category_id,
            category_sublv1_id,
            category_sublv2_id,
            category_sublv3_id,
            complaint_detail,
            response_detail,
            sla,
            org_id,
            user_create,
            date_create
        } = req.body;


        await knex('tickets')
            .insert([{
                customer_id,
                ticket_number,
                // group_ticket_number,
                ticket_source,
                status,
                category_id,
                category_sublv1_id,
                category_sublv2_id,
                category_sublv3_id,
                complaint_detail,
                response_detail,
                sla,
                ticket_position: 1,
                org_id,
                user_create,
                date_create
            }]);
        // const res_ticket = await knex('tickets').where({ ticket_number }).first();
        response.ok(res, ticket_number);
    }
    catch (error) {
        console.log(error);
        logger('ticket/store', error);
        res.status(500).end();
    }
}

const history_transaction = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { customer_id } = req.params;
        const tickets = await knex('tickets')
            .select('ticket_number', 'ticket_source', 'status', 'category_id', 'category_sublv1_id', 'category_sublv2_id', 'category_sublv3_id', 'date_create', 'complaint_detail', 'response_detail')
            .where({ customer_id }).orderBy('id', 'desc');

        for (let i = 0; i < tickets.length; i++) {
            tickets[i].date_create = datetime(tickets[i].date_create)
        }

        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/history_transaction', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    store,
    history_transaction,
}