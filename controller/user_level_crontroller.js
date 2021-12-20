const knex = require('../config/db_connect');
const response = require('../helper/json_response');

const user_level = async function (req, res){
    if (req.method !== 'GET') return res.status(405).end();
    const user_level = await knex('user_level');
    response.ok(res, user_level)
}

module.exports = {user_level}