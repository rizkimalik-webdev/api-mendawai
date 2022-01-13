const knex = require('../../config/db_connect');
const response = require('../../helper/json_response');

const index = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const res_status = await knex('status');
    response.ok(res, res_status)
}

module.exports = { index }