
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
        table.timestamps();
        //alter column
        table.boolean('inbound');
        table.boolean('outbound');
        table.boolean('sms');
        table.boolean('email');
        table.boolean('chat');
        table.boolean('facebook');
        table.boolean('twitter');
        table.boolean('instagram');
        table.boolean('whatsapp');
        table.integer('max_inbound', 10);
        table.integer('max_outbound', 10);
        table.integer('max_sms', 10);
        table.integer('max_email', 10);
        table.integer('max_chat', 10);
        table.integer('max_facebook', 10);
        table.integer('max_twitter', 10);
        table.integer('max_instagram', 10);
        table.integer('max_whatsapp', 10);
        table.integer('max_queue', 10);
        table.integer('max_concurrent', 10);
        table.string('uuid', 100);
        table.boolean('connected');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('users');
};

module.exports = {up, down}