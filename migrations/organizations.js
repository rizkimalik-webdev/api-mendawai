
const up = function(knex) {
    return knex.schema.createTable('organizations', function(table){
        table.increments('id').primary();
        table.string('organization_id', 100).unique().notNullable();
        table.string('organization_name').notNullable();
        table.string('email', 100);
        table.string('description');
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('organizations');
};

export {up, down}