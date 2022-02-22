'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const id = require('date-and-time/locale/id');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');
const { datetime, isostring } = require('../helper/datetime_format');
date.locale(id);

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const tickets = await knex('view_tickets');
        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { ticket_number } = req.params;
        const tickets = await knex('tickets').where({ ticket_number }).first();
        tickets.date_create = isostring(tickets.date_create);
        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/show', error);
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
            department_id,
            type_customer,
            priority_scale,
            source_information,
            type_complaint,
            user_create,
            date_create,
            cust_name,
            cust_email,
            cust_telephone,
            cust_address,
        } = req.body;

        let user_closed, date_closed;
        if (status === 'Closed') {
            user_closed = user_create;
            date_closed = date_create;
        }

        await knex('tickets')
            .insert([{
                customer_id,
                ticket_number,
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
                department_id,
                type_customer,
                priority_scale,
                source_information,
                type_complaint,
                user_create,
                date_create,
                user_closed,
                date_closed
            }]);
        store_ticket_detail({
            ticket_number,
            cust_name,
            cust_email,
            cust_telephone,
            cust_address,
        });
        store_ticket_interactions({
            ticket_number,
            response_complaint: response_detail,
            status,
            channel: ticket_source,
            user_create,
            first_create: user_create,
        });
        response.ok(res, ticket_number);
    }
    catch (error) {
        console.log(error);
        logger('ticket/store', error);
        res.status(500).end();
    }
}

const store_ticket_detail = async function (req) {
    try {
        const {
            ticket_number,
            cust_name,
            cust_email,
            cust_telephone,
            cust_address,
            // account_no,
        } = req;

        await knex('ticket_detail')
            .insert([{
                ticket_number,
                cust_name,
                cust_email,
                cust_telephone,
                cust_address,
            }]);
    }
    catch (error) {
        console.log(error);
        logger('ticket/store_ticket_detail', error);
    }
}

const store_ticket_interactions = async function (req) {
    try {
        const {
            ticket_number,
            response_complaint,
            status,
            channel,
            user_create,
            first_create,
            created_at = knex.fn.now()
        } = req;

        await knex('ticket_interactions')
            .insert([{
                ticket_number,
                channel,
                response_complaint,
                status,
                user_create,
                created_at,
                first_create,
            }]);
    }
    catch (error) {
        console.log(error);
        logger('ticket/store_ticket_interactions', error);
    }
}

const ticket_interactions = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { ticket_number } = req.params;
        const data = await knex('ticket_interactions')
            .select('id', 'ticket_number', 'response_complaint', 'channel', 'status', 'user_create', 'created_at', 'first_create')
            .where({ ticket_number }).orderBy('id', 'desc');

        for (let i = 0; i < data.length; i++) {
            data[i].created_at = datetime(data[i].created_at)
        }
        response.ok(res, data);
    }
    catch (error) {
        console.log(error);
        logger('ticket/ticket_interactions', error);
        res.status(500).end();
    }
}

const publish = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const now = new Date();
        const {
            customer_id,
            group_ticket_number = date.format(now, 'DDHHmmSS'),
        } = req.body;

        await knex('tickets').update({ group_ticket_number }).where({ customer_id }).whereNull('group_ticket_number');
        response.ok(res, group_ticket_number);
    }
    catch (error) {
        console.log(error);
        logger('ticket/publish', error);
        res.status(500).end();
    }
}

const data_publish = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { customer_id } = req.params;
        const tickets = await knex('view_tickets').where({ customer_id }).whereNull('group_ticket_number').orderBy('id', 'desc');

        for (let i = 0; i < tickets.length; i++) {
            tickets[i].date_create = datetime(tickets[i].date_create)
        }
        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/data_publish', error);
        res.status(500).end();
    }
}

const history_transaction = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { customer_id } = req.params;
        const tickets = await knex('view_tickets').where({ customer_id }).limit(5).orderBy('id', 'desc');

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

const history_ticket = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { date_from, date_to } = req.body;
        const tickets = await knex.raw(`
            SELECT * FROM view_tickets 
            WHERE CONVERT(DATE, date_create) >= CONVERT(DATE, '${date_from}') AND CONVERT(DATE, date_create) <= CONVERT(DATE, '${date_to}')
            ORDER BY date_create DESC
        `);

        for (let i = 0; i < tickets.length; i++) {
            tickets[i].date_create = datetime(tickets[i].date_create)
        }

        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('ticket/history_ticket', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    show,
    store,
    publish,
    data_publish,
    history_transaction,
    ticket_interactions,
    history_ticket,
}