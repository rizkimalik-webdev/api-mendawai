const knex = require('../../config/db_connect');
const { response, logger } = require('../../helper');

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const category = await knex('category_sub_lv1').select('category_id', 'category_sublv1_id', 'sub_name', 'description');
        response.ok(res, category);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv1/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const { category_sublv1_id } = req.params;
        const category = await knex('category_sub_lv1').where({ category_sublv1_id });
        response.ok(res, category);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv1/show', error);
        res.status(500).end();
    }
}

const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const {
            category_id,
            sub_name,
            description,
            user_create = 'Admin',
            created_at = knex.fn.now(),
        } = req.body;
        const subcategory1 = await knex('category_sub_lv1')
            .select('category_sublv1_id')
            .orderBy('category_sublv1_id', 'desc').first();

        let categorysublv1_id;
        if (Boolean(subcategory1) === false) {
            categorysublv1_id = `CT1-10001`;
        }
        else {
            const categorysublv1_no = Number(subcategory1.category_sublv1_id.split('-')[1]) + 1;
            categorysublv1_id = `CT1-${categorysublv1_no}`;
        }

        await knex('category_sub_lv1')
            .insert([{
                category_id,
                category_sublv1_id: categorysublv1_id,
                sub_name,
                description,
                user_create,
                created_at
            }]);
        response.ok(res, categorysublv1_id);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv1/store', error);
        res.status(500).end();
    }
}

const update = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        const {
            category_id,
            category_sublv1_id,
            sub_name,
            description,
            user_update = 'Admin',
            updated_at = knex.fn.now(),
        } = req.body;

        await knex('category_sub_lv1')
            .update({
                category_id,
                sub_name,
                description,
                user_update,
                updated_at,
            })
            .where({ category_sublv1_id });
        response.ok(res, 'success update');
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv1/update', error);
        res.status(500).end();
    }
}

const destroy = async function (req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');
        const { category_sublv1_id } = req.params;
        const res_delete = await knex('category_sub_lv1').where({ category_sublv1_id }).del();
        response.ok(res, res_delete);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv1/destroy', error);
        res.status(500).end();
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}