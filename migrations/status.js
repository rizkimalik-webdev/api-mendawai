
const up = function(knex) {
    return knex.schema.createTable('status', function(table){
        table.increments('id').primary();
        table.string('status', 50).unique().notNullable();
        table.string('icon', 50);
        table.string('description', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('status');
};

module.exports = {up, down}