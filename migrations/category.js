
const up = function(knex) {
    return knex.schema.createTable('category', function(table){
        table.increments('id').primary();
        table.string('category_id', 100).unique().notNullable();
        table.string('name', 150).notNullable();
        table.string('description');
        table.string('user_create', 50);
        table.string('user_update', 50);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('category');
};

module.exports = {up, down}