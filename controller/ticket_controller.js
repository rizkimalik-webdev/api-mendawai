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
            ticket_position,
            org_id,
            user_create,
            date_create = knex.fn.now()
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
                ticket_position,
                org_id,
                user_create,
                date_create
            }]);
        const res_ticket = await knex('tickets').where({ ticket_number }).first();
        response.ok(res, res_ticket);
    }
    catch (error) {
        console.log(error);
        logger('ticket/store', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    // show,
    store,
    // update,
}