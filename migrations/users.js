
const up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id').primary();
        table.string('name', 100);
        table.string('username', 100).unique().notNullable();
        table.string('email_address').unique();
        table.string('password').notNullable();
        table.string('user_level', 100);
        table.integer('login', 5);
        table.integer('aux', 5);
        table.integer('organization', 5);
        table.integer('department', 5);
        table.string('role', 50);
        table.integer('max_concurrent', 10);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('users');
};

module.exports = {up, down}