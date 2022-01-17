'use strict';
const knex = require('../config/db_connect');
const bcrypt = require('bcryptjs');
const { auth_jwt_bearer } = require('../middleware');
const logger = require('../helper/logger');
const response = require('../helper/json_response');


const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        auth_jwt_bearer(req, res);
        const users = await knex('users').orderBy(['username', 'user_level']);
        response.ok(res, users);
    }
    catch (error) {
        console.log(error);
        logger('user/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { id } = req.params;
        const getUser = await knex('users').where('id', id);
        response.ok(res, getUser);
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
        // auth_jwt_bearer(req, res);
        const {
            name,
            username,
            email_address,
            password,
            user_level,
            organization,
            inbound,
            outbound,
            sms,
            email,
            chat,
            facebook,
            twitter,
            instagram,
            whatsapp,
            max_inbound,
            max_outbound,
            max_sms,
            max_email,
            max_chat,
            max_facebook,
            max_twitter,
            max_instagram,
            max_whatsapp,
            max_queue,
            max_concurrent
        } = req.body;

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        await knex('users')
            .insert([{
                name,
                username,
                email_address,
                password: passwordHash,
                user_level,
                login: 0,
                aux: 0,
                organization,
                inbound,
                outbound,
                sms,
                email,
                chat,
                facebook,
                twitter,
                instagram,
                whatsapp,
                max_inbound,
                max_outbound,
                max_sms,
                max_email,
                max_chat,
                max_facebook,
                max_twitter,
                max_instagram,
                max_whatsapp,
                max_queue,
                max_concurrent,
                created_at: knex.fn.now()
            }]);

        const getUser = await knex('users').where({ username }).first();
        response.ok(res, getUser);
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

        const {
            id,
            name,
            username,
            email_address,
            user_level,
            organization,
            inbound,
            outbound,
            sms,
            email,
            chat,
            facebook,
            twitter,
            instagram,
            whatsapp,
            max_inbound,
            max_outbound,
            max_sms,
            max_email,
            max_chat,
            max_facebook,
            max_twitter,
            max_instagram,
            max_whatsapp,
            max_queue,
            max_concurrent
        } = req.body;

        await knex('users')
            .where({ id })
            .update({
                name,
                username,
                email_address,
                user_level,
                organization,
                inbound,
                outbound,
                sms,
                email,
                chat,
                facebook,
                twitter,
                instagram,
                whatsapp,
                max_inbound,
                max_outbound,
                max_sms,
                max_email,
                max_chat,
                max_facebook,
                max_twitter,
                max_instagram,
                max_whatsapp,
                max_queue,
                max_concurrent,
                updated_at: knex.fn.now()
            });
        const getData = await knex('users').where({ id }).first();
        response.ok(res, getData);
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
        const delData = await knex('users').where({ id }).del();
        response.ok(res, delData);
    }
    catch (error) {
        console.log(error);
        logger('user/destroy', error);
        res.status(500).end();
    }
}

const reset_password = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        auth_jwt_bearer(req, res);
        const { id, password } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        await knex('users')
            .where({ id })
            .update({ password: passwordHash });
        response.ok(res, 'success reset password');
    }
    catch (error) {
        console.log(error);
        logger('user/reset_password', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    reset_password
}
