
const up = function(knex) {
    return knex.schema.createTable('status', function(table){
        table.increments('id').primary();
        table.string('status', 100).unique().notNullable();
        table.string('status_name').notNullable();
        table.string('description');
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('status');
};

export {up, down}