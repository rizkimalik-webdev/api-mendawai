'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
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
            tickets = await knex.raw(`SELECT status, (select count(ticket_number) FROM tickets where status=status.status AND org_id='${organization_id}' AND user_create='${user_create}') as total FROM status ORDER BY id ASC`);
        }
        else if (user_level === 'Layer2') {
            tickets = await knex.raw(`SELECT status, (select count(ticket_number) FROM tickets where status=status.status AND org_id='${organization_id}' AND ticket_position='2') as total FROM status ORDER BY id ASC`);
        }
        else if (user_level === 'Layer3') {
            tickets = await knex.raw(`SELECT status, (select count(ticket_number) FROM tickets where status=status.status AND department_id='${department_id}' AND ticket_position='3') as total FROM status ORDER BY id ASC`);
        }
        else {
            //? user_level = admin
            tickets = await knex.raw(`SELECT status, (select count(ticket_number) FROM tickets where status=status.status AND org_id='${organization_id}') as total FROM status ORDER BY id ASC`);
        }

        if (process.env.DB_CONNECTION === 'mysql') {
            response.ok(res, tickets[0]);
        }
        else {
            response.ok(res, tickets);
        }
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
            tickets = await knex.raw(`SELECT *, DATE_FORMAT(date_create,'%Y-%m-%d %H:%i:%s') AS date_create FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}' AND user_create='${user_create}'`);
        }
        else if (user_level === 'Layer2') {
            tickets = await knex.raw(`SELECT *, DATE_FORMAT(date_create,'%Y-%m-%d %H:%i:%s') AS date_create FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}' AND ticket_position='2'`);
        }
        else if (user_level === 'Layer3') {
            tickets = await knex.raw(`SELECT *, DATE_FORMAT(date_create,'%Y-%m-%d %H:%i:%s') AS date_create FROM view_tickets WHERE status='${status}' AND department_id='${department_id}' AND ticket_position='3'`);
        }
        else {
            //? user_level = admin
            tickets = await knex.raw(`SELECT *, DATE_FORMAT(date_create,'%Y-%m-%d %H:%i:%s') AS date_create FROM view_tickets WHERE status='${status}' AND org_id='${organization_id}'`);
        }

        // for (let i = 0; i < tickets.length; i++) {
        //     tickets[i].date_create = date.format(tickets[i].date_create, 'YYYY-MM-DD HH:mm:SS', true)
        // }

        response.ok(res, tickets[0]);
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