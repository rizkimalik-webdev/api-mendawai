
const up = function(knex) {
    return knex.schema.createTable('organizations', function(table){
        table.increments('id').primary();
        table.string('organization_name', 50).notNullable();
        table.string('email', 100);
        table.string('description');
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('organizations');
};

module.exports = {up, down}