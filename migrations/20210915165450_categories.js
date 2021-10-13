
exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table){
        table.increments('id').primary();
        table.string('code', 100).unique().notNullable();
        table.string('name').notNullable();
        table.string('description');
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
