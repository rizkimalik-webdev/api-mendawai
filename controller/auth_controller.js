const knex = require('../config/db_connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../helper/logger');
const response = require('../helper/json_response');


exports.login = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username, password } = req.body;

        //?check username
        const user = await knex('users').where({ username }).first();
        if (!user) return response.forbidden(res, { value: 'username', message: 'Username not found' }, 'auth/login');

        //?check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return response.forbidden(res, { value: 'password', message: 'Password not match' }, 'auth/login');

        //?login update
        await knex('users').update({ login: 1 }).where({ username });

        //?generate token
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.APP_KEY, { expiresIn: 86400 }) //24hours

        //? set cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 86400,
        //     signed: false,
        // });

        //?send token
        user.token = token;
        response.ok(res, user);
    }
    catch (error) {
        response.error(res, error, 'auth/login')
    }
}

exports.logout = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username } = req.body;

        //?login update
        await knex('users').update({ login: 0 }).where({ username });
        response.ok(res, { message: 'logout success' });
    }
    catch (error) {
        response.error(res, error, 'auth/logout')

    }
}

exports.user_socket = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        const { username, socket_id } = req.body;

        await knex('users')
            .where({ username })
            .update({ socket_id });
        response.ok(res, 'success update socket.');
    }
    catch (error) {
        response.error(res, error, 'auth/user_socket')
    }
}