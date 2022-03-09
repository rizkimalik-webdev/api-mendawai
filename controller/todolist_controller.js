'use strict';
const knex = require('../config/db_connect');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');

const total_ticket = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { department_id, organization_id, user_create, user_level } = req.body;

        let tickets;
        if (user_level === 'Layer1') {
            tickets = await knex.raw(`
                SELECT status, (select count(ticket_number) from tickets where status=status.status AND org_id='${organization_id}' AND user_create='${user_create}') as total FROM status
            `);
        }
        else if (user_level === 'Layer2') {
            tickets = await knex.raw(`
                SELECT status, (select count(ticket_number) from tickets where status=status.status AND org_id='${organization_id}' AND ticket_position='2') as total FROM status
            `);
        }
        else if (user_level === 'Layer3') {
            tickets = await knex.raw(`
                SELECT status, (select count(ticket_number) from tickets where status=status.status AND department_id='${department_id}' AND ticket_position='3') as total FROM status
            `);
        }
        else {
            //? user_level = admin
            tickets = await knex.raw(`
                SELECT status, (select count(ticket_number) from tickets where status=status.status AND org_id='${organization_id}') as total FROM status
            `);
        }

        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('todolist/total_ticket', error);
        res.status(500).end();
    }
}

const data_ticket = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const { department_id, organization_id, user_create, user_level, status } = req.body;

        let tickets;
        if (user_level === 'Layer1') {
            tickets = await knex.raw(`SELECT * FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}' AND user_create='${user_create}'`);
        }
        else if (user_level === 'Layer2') {
            tickets = await knex.raw(`SELECT * FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}' AND ticket_position='2'`);
        }
        else if (user_level === 'Layer3') {
            tickets = await knex.raw(`SELECT * FROM view_tickets WHERE status='${status}' AND department_id='${department_id}' AND ticket_position='3'`);
        }
        else {
            //? user_level = admin
            tickets = await knex.raw(`SELECT * FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}'`);
        }

        response.ok(res, tickets);
    }
    catch (error) {
        console.log(error);
        logger('todolist/data_ticket', error);
        res.status(500).end();
    }
}

module.exports = {
    total_ticket,
    data_ticket,
}