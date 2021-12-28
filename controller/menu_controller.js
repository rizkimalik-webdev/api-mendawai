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
    const { user_level } = req.query;
    const res_menu_access = await knex('menu_access').where({ user_level, access: 'menu' }).orderBy('menu_id', 'ASC');

    for (let i = 0; i < res_menu_access.length; i++) {
        const { menu_name } = await knex('menu').select('menu_name').where({ menu_id: res_menu_access[i].menu_id }).first();
        res_menu_access[i].menu_name = menu_name;
    }

    response.ok(res, res_menu_access)
}

const modul_access = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { user_level, menu_id } = req.query;
    const res_modul_access = await knex('menu_access').where({ user_level, menu_id, access: 'modul' }).orderBy('menu_modul_id', 'ASC');

    for (let i = 0; i < res_modul_access.length; i++) {
        const { menu_name } = await knex('menu').select('menu_name').where({ menu_id: res_modul_access[i].menu_id }).first();
        res_modul_access[i].menu_name = menu_name;

        if (res_modul_access[i].menu_modul_id) {
            const { menu_modul_name } = await knex('menu_modul').select('menu_modul_name').where({ menu_modul_id: res_modul_access[i].menu_modul_id }).first();
            res_modul_access[i].menu_modul_name = menu_modul_name;
        }
    }

    response.ok(res, res_modul_access)
}

const submodul_access = async function (req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    const { user_level, modul_id } = req.query;
    const res_submodul_access = await knex('menu_access').where({ user_level, modul_id, access: 'submodul' }).orderBy('menu_submodul_id', 'ASC');

    for (let i = 0; i < res_submodul_access.length; i++) {
        const { menu_name } = await knex('menu').select('menu_name').where({ menu_id: res_submodul_access[i].menu_id }).first();
        res_submodul_access[i].menu_name = menu_name;

        if (res_submodul_access[i].menu_modul_id) {
            const { menu_modul_name } = await knex('menu_modul').select('menu_modul_name').where({ menu_modul_id: res_submodul_access[i].menu_modul_id }).first();
            res_submodul_access[i].menu_modul_name = menu_modul_name;
        }

        if (res_submodul_access[i].menu_submodul_id) {
            const { menu_submodul_name } = await knex('menu_submodul').select('menu_modul_name').where({ menu_submodul_id: res_submodul_access[i].menu_submodul_id }).first();
            res_submodul_access[i].menu_submodul_name = menu_submodul_name;
        }
    }

    response.ok(res, res_submodul_access)
}

const store_access = async function (req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { user_level, menu_id, menu_modul_id, menu_submodul_id, user_create, access } = req.body;

    if (access === 'menu') {
        const check_menu = await knex('menu_access').where({ user_level, menu_id });
        if (check_menu.length == 0) {
            await knex('menu_access')
                .insert([{
                    access,
                    user_level,
                    menu_id,
                    menu_modul_id: 0,
                    menu_submodul_id: 0,
                    user_create,
                    created_at: knex.fn.now()
                }]);
            response.ok(res, 'Success Insert Menu.')
        }
        else {
            response.ok(res, 'Menu Already exists.')
        }
    }

    if (access === 'modul') {
        const check_modul = await knex('menu_access').where({ user_level, menu_modul_id });
        if (check_modul.length == 0) {
            await knex('menu_access')
                .insert([{
                    access,
                    user_level,
                    menu_id,
                    menu_modul_id,
                    menu_submodul_id: 0,
                    user_create,
                    created_at: knex.fn.now()
                }]);
            response.ok(res, 'Success Insert Menu Modul.')
        }
        else {
            response.ok(res, 'Menu Modul Already exists.')
        }
    }

    if (access === 'submodul') {
        const check_submodul = await knex('menu_access').where({ user_level, menu_submodul_id });
        if (check_submodul.length == 0) {
            await knex('menu_access')
                .insert([{
                    access,
                    user_level,
                    menu_id,
                    menu_modul_id,
                    menu_submodul_id,
                    user_create,
                    created_at: knex.fn.now()
                }]);
            response.ok(res, 'Success Insert Menu SubModul.')
        }
        else {
            response.ok(res, 'Menu SubModul Already exists.')
        }
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
    modul_access,
    submodul_access,
    store_access,
    delete_access
}