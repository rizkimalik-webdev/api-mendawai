const knex = require('../config/db_connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');


exports.login = async function(req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username, password } = req.body;

        //?check username
        const user = await knex('users').where({ username }).first();
        if (!user) return res.status(403).json({ error: 'invalid password', value: 'username', message: 'Username not found' });

        //?check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(403).json({ error: 'invalid password', value: 'password', message: 'Password not match' });

        //?login update
        await knex('users').update({ login: 1 }).where({ username });

        //?generate token
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: 86400 }) //24hours

        //? set cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 86400,
        //     signed: false,
        // });

        
        //?send token
        user.token = token;

        // response(res, data, 'User login success');
        res.json(user);
        res.end();
    }
    catch (error) {
        console.log(error);
        logger('auth/login', error);
        res.status(500).end();
    }
}

exports.logout = async function (req, res){
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const { username } = req.body;
        
        //?login update
        await knex('users').update({login:0}).where({username});

        res.clearCookie('token');
        res.json({status: 'success'});
        res.end();
    }
    catch (error) {
        console.log(error);
        logger('auth/logout',error);
        res.status(500).end();
    }
}