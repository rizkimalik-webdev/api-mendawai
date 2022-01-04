'use strict';
const knex = require('../config/db_connect');
const date = require('date-and-time');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../config/logger');
const response = require('../helper/json_response');


const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const customers = await knex('customers').orderBy(['name', 'email']);
        response.ok(res, customers);
    }
    catch (error) {
        console.log(error);
        logger('customer/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { id } = req.params;
        const res_customer = await knex('customers').where({ id });
        response.ok(res, res_customer);
    }
    catch (error) {
        console.log(error);
        logger('customer/show', error);
        res.status(500).end();
    }
}


const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { name,  email_address, password, customer_level, max_concurrent } = req.body;
        await knex('customers')
            .insert([{
                name,
                email_address,
                password: passwordHash,
                customer_level,
                login: 0,
                max_concurrent,
                created_at: knex.fn.now()
            }]);

        const getcustomer = await knex('customers').where({ name }).first();
        response.ok(res, getcustomer);
    }
    catch (error) {
        console.log(error);
        logger('customer/store', error);
        res.status(500).end();
    }
}


const update = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { id, name, customer_name, email_address, customer_level, max_concurrent } = req.body;
        await knex('customers')
            .where({ id })
            .update({ name, customer_name, email_address, customer_level, max_concurrent })
        const getData = await knex('customers').where({ id: id }).first();
        response.ok(res, getData);
    }
    catch (error) {
        console.log(error);
        logger('customer/update', error);
        res.status(500).end();
    }
}


const destroy = async function (req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);

        const { id } = req.params;
        const delData = await knex('customers').where({ id }).del();
        response.ok(res, delData);
    }
    catch (error) {
        console.log(error);
        logger('customer/destroy', error);
        res.status(500).end();
    }
}

const insert_customer_sosmed = async function (req) {
    try {
        const { name, email } = req;
        const now = new Date();
        const customerid = date.format(now, 'YYYYMMDDHHmmSSS');
        const check_data = await knex('customers').where('email', email);

        if (check_data.length === 0) {
            await knex('customers')
                .insert([{
                    customer_id: customerid,
                    name: name,
                    email: email,
                    source: 'chat',
                    created_at: knex.fn.now()
                }]);
        }
    }
    catch (error) {
        console.log(error);
        logger('customer/insert_customer', error);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    insert_customer_sosmed
}
