const knex = require('../../config/db_connect');
const response = require('../../helper/json_response');

const index = async function (req, res){
    if (req.method !== 'GET') return res.status(405).end();
    const res_channels = await knex('channels');
    response.ok(res, res_channels)
}

module.exports = {index}