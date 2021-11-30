
const up = function(knex) {
    return knex.schema.createTable('category', function(table){
        table.increments('id').primary();
        table.string('category_id', 100).unique().notNullable();
        table.string('name').notNullable();
        table.string('description');
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('category');
};

export {up, down}