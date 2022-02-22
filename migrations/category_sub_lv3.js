
const up = function(knex) {
    return knex.schema.createTable('category_sub_lv3', function(table){
        table.increments('id').primary();
        table.string('category_id', 50).notNullable();
        table.string('category_sublv1_id', 50).notNullable();
        table.string('category_sublv2_id', 50).notNullable();
        table.string('category_sublv3_id', 50).unique().notNullable();
        table.string('sub_name', 150).notNullable();
        table.string('description');
        table.integer('department_id', 5);
        table.integer('sla', 5);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('category_sub_lv3');
};

module.exports = {up, down}