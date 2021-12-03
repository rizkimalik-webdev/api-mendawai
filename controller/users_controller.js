'use strict';
const knex = require('../config/db_connect');
const bcrypt = require('bcryptjs');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../config/logger');


const index = async function (req, res) {
    try {
        if(req.method !== 'GET') return res.status(405).end();

        auth_jwt_bearer(req, res);
        const users = await knex('users');

        res.json(users);
        res.end();
    } 
    catch (error) {
        console.log(error);
        logger('user/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if(req.method !== 'GET') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { id } = req.params;
        const getUser = await knex('users').where('id',id);
        
        res.status(200);
        res.json({ 
            status: 200,
            data: getUser 
        });
        res.end();
    } 
    catch (error) {
        console.log(error);
        logger('user/show', error);
        res.status(500).end();
    }
}


const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);

        const { name, username, email_address, password, user_level, max_concurrent } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        const getId = await knex('users')
            .insert([{
                name,
                username,
                email_address,
                password: passwordHash,
                user_level,
                login: 0,
                max_concurrent,
                created_at: knex.fn.now()
            }]);

        const getData = await knex('users').where({ username }).first();

        res.status(200);
        res.json({
            status: 200,
            data: getData
        });
        res.end();
    }
    catch (error) {
        console.log(error);
        logger('user/store', error);
        res.status(500).end();
    }
}


const update = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);

        const { id, name, username, email_address, password, user_level, max_concurrent } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        const getId = await knex('users')
            .where({ id })
            .update({ name, username, email_address, password: passwordHash, user_level, max_concurrent, updated_at: knex.fn.now() })

        const getData = await knex('users').where({ id: id }).first();

        res.status(200);
        res.json({
            'status': 200,
            'data': getData
        });
        res.end();
    }
    catch (error) {
        console.log(error);
        logger('user/update', error);
        res.status(500).end();
    }
}


const destroy = async function (req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);

        const { id } = req.params;
        const deleteRow = await knex('users').where({ id }).del();

        res.status(200);
        res.json({
            status: 200,
            message: 'Success Delete',
        });
        res.end();
    }
    catch (error) {
        console.log(error);
        logger('user/destroy', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}
