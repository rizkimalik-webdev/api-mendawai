
const up = function(knex) {
    return knex.schema.createTable('category_sub_lv2', function(table){
        table.increments('id').primary();
        table.string('category_id', 100).notNullable();
        table.string('category_sublv1_id', 100).notNullable();
        table.string('category_sublv2_id', 100).unique().notNullable();
        table.string('sub_name', 150).notNullable();
        table.string('description');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('category_sub_lv2');
};

module.exports = {up, down}