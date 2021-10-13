
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id').primary();
        table.string('name', 100);
        table.string('username', 100).unique().notNullable();
        table.string('email_address').unique();
        table.string('password').notNullable();
        table.string('user_level', 100);
        table.integer('login', 5);
        table.integer('max_concurrent', 10);
        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
