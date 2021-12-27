const knex = require('../config/db_connect');
const response = require('../helper/json_response');

const main_menu = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const mainmenu = await knex('menu');

    for (let i = 0; i < mainmenu.length; i++) {
        const menu_modul_data = await knex('menu_modul').where({ menu_id: mainmenu[i].menu_id });
        mainmenu[i].menu_modul = menu_modul_data;
    }
    response.ok(res, mainmenu)
}

const menu = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const menu = await knex('menu');
    response.ok(res, menu)
}

const menu_modul = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { menu_id } = req.params;
    const menu_modul = await knex('menu_modul').where({ menu_id });
    response.ok(res, menu_modul)
}

const menu_submodul = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { menu_modul_id } = req.params;
    const menu_submodul = await knex('menu_submodul').where({ menu_modul_id });
    response.ok(res, menu_submodul)
}

const menu_access = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { user_level } = req.params;
    const res_menu_access = await knex('menu_access').where({ user_level }).orderBy('menu_id', 'ASC');

    for (let i = 0; i < res_menu_access.length; i++) {
        const { menu_name } = await knex('menu').select('menu_name').where({ menu_id: res_menu_access[i].menu_id }).first();
        res_menu_access[i].menu_name = menu_name;
    }
    response.ok(res, res_menu_access)
}

const store_access = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { user_level, menu_id, menu_modul_id, menu_submodul_id, user_create } = req.body;
    const check = await knex('menu_access').where({ user_level, menu_id });

    if (check.length > 0) {
        response.ok(res, 'Menu Already exists.')
    }
    else {
        await knex('menu_access')
            .insert([{
                user_level,
                menu_id,
                menu_modul_id,
                menu_submodul_id,
                user_create,
                created_at: knex.fn.now()
            }]);
        response.ok(res, 'Success Insert Menu.')
    }
}

const delete_access = async function (req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();
    const { id } = req.params;
    const res_delete_access = await knex('menu_access').where({ id }).del();
    response.ok(res, res_delete_access)
}

module.exports = {
    main_menu,
    menu,
    menu_modul,
    menu_submodul,
    menu_access,
    store_access,
    delete_access
}