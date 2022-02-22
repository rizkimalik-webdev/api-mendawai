
const up = function(knex) {
    return knex.schema.createTable('organizations', function(table){
        table.increments('id').primary();
        table.string('organization_name', 50).notNullable();
        table.string('description');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('organizations');
};

module.exports = {up, down}