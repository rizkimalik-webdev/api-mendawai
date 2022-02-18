const knex = require('../../config/db_connect');
const { response, logger } = require('../../helper');

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const { category_sublv1_id } = req.params;
        let data = '';
        if (category_sublv1_id === 'all') {
            data = await knex('category_sub_lv2');
        }
        else {
            data = await knex('category_sub_lv2').where({ category_sublv1_id });
        }
        for (let i = 0; i < data.length; i++) {
            const { name } = await knex('category').where({ category_id: data[i].category_id }).select('name').first();
            const { sub_name } = await knex('category_sub_lv1').where({ category_sublv1_id: data[i].category_sublv1_id }).select('sub_name').first();
            data[i].category_name = name;
            data[i].category_sublv1_name = sub_name;
        }
        response.ok(res, data);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv2/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const { category_sublv2_id } = req.params;
        const category = await knex('category_sub_lv2').where({ category_sublv2_id });
        response.ok(res, category);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv2/show', error);
        res.status(500).end();
    }
}

const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const {
            category_id,
            category_sublv1_id,
            sub_name,
            description
        } = req.body;
        const subcategory2 = await knex('category_sub_lv2')
            .select('category_sublv2_id')
            .orderBy('category_sublv2_id', 'desc').first();

        let categorysublv2_id;
        if (Boolean(subcategory2) === false) {
            categorysublv2_id = `CT2-20001`;
        }
        else {
            const categorysublv2_no = Number(subcategory2.category_sublv2_id.split('-')[1]) + 1;
            categorysublv2_id = `CT2-${categorysublv2_no}`;
        }

        await knex('category_sub_lv2')
            .insert([{
                category_id,
                category_sublv1_id,
                category_sublv2_id: categorysublv2_id,
                sub_name,
                description
            }]);
        response.ok(res, categorysublv2_id);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv2/store', error);
        res.status(500).end();
    }
}

const update = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        const {
            category_id,
            category_sublv1_id,
            category_sublv2_id,
            sub_name,
            description
        } = req.body;

        await knex('category_sub_lv2')
            .update({
                category_id,
                category_sublv1_id,
                sub_name,
                description
            })
            .where({ category_sublv2_id });
        response.ok(res, 'success update');
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv2/update', error);
        res.status(500).end();
    }
}

const destroy = async function (req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');
        const { category_sublv2_id } = req.params;
        const res_delete = await knex('category_sub_lv2').where({ category_sublv2_id }).del();
        response.ok(res, res_delete);
    }
    catch (error) {
        console.log(error);
        logger('category_sub_lv2/destroy', error);
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