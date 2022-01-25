const knex = require('../../config/db_connect');
const response = require('../../helper/json_response');

const index = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const res_data = await knex('organizations').select('id', 'organization_name', 'email', 'description');
    response.ok(res, res_data)
}

module.exports = { index }