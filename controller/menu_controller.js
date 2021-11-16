const knex = require('../config/db_connect');

exports.menu = async function (req, res){
    if (req.method !== 'GET') return res.status(405).end();

    const menus = await knex('menu');

    for (let i = 0; i < menus.length; i++) {
        const menu_modul_data = await knex('menu_modul').where({ menu_id: menus[i].menu_id});
        menus[i].menu_modul = menu_modul_data;
    }

    res.json(menus);
    res.end();
}