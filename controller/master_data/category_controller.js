const knex = require('../../config/db_connect');
const { response, logger } = require('../../helper');

const index = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const category = await knex('category').select('category_id', 'name','description');
        response.ok(res, category);
    }
    catch (error) {
        console.log(error);
        logger('category/index', error);
        res.status(500).end();
    }
}

const show = async function (req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).end();
        const { category_id } = req.params;
        const category = await knex('category').where({ category_id });
        response.ok(res, category);
    }
    catch (error) {
        console.log(error);
        logger('category/show', error);
        res.status(500).end();
    }
}

const store = async function (req, res) {
    try {
        if (req.method !== 'POST') return res.status(405).end('Method not Allowed');
        const {
            name,
            description,
            created_at = knex.fn.now(),
        } = req.body;
        const category = await knex('category').select('category_id').orderBy('category_id', 'desc').first();

        let categoryid;
        if (Boolean(category === false)) {
            categoryid = `CAT-10001`;
        }
        else {
            const category_no = Number(category.category_id.split('-')[1]) + 1;
            categoryid = `CAT-${category_no}`;
        }

        await knex('category')
            .insert([{
                category_id: categoryid,
                name,
                description,
                created_at
            }]);
        response.ok(res, categoryid);
    }
    catch (error) {
        console.log(error);
        logger('category/store', error);
        res.status(500).end();
    }
}

const update = async function (req, res) {
    try {
        if (req.method !== 'PUT') return res.status(405).end('Method not Allowed');
        const {
            category_id,
            name,
            description,
            updated_at = knex.fn.now()
        } = req.body;

        await knex('category')
            .update({
                name,
                description,
                updated_at
            })
            .where({ category_id });
        response.ok(res, 'success update');
    }
    catch (error) {
        console.log(error);
        logger('category/update', error);
        res.status(500).end();
    }
}

const destroy = async function (req, res) {
    try {
        if (req.method !== 'DELETE') return res.status(405).end('Method not Allowed');
        const { category_id } = req.params;
        const res_delete = await knex('category').where({ category_id }).del();
        response.ok(res, res_delete);
    }
    catch (error) {
        console.log(error);
        logger('category/destroy', error);
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