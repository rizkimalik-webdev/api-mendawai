
const up = function(knex) {
    return knex.schema.createTable('status', function(table){
        table.increments('id').primary();
        table.string('status', 100).unique().notNullable();
        table.string('description');
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('status');
};

module.exports = {up, down}