
const up = function(knex) {
    return knex.schema.createTable('threads', function(table){
        table.increments('id').primary();
        table.string('value_thread', 100).notNullable();
        table.string('genesys_number', 100).notNullable();
        table.string('thread_id', 100);
        table.string('account', 150).nullable();
        table.string('account_contact_id', 150).nullable();
        table.string('agent_id', 100).nullable();
        table.text('subject').nullable();
        table.string('ticket_number', 100).nullable();
        table.string('type', 20).nullable();
        table.text('thread_reason').nullable();
        table.string('customer_id', 100).nullable();
        table.string('phone_chat', 100).nullable();
        table.string('user_create', 100).nullable();
        table.string('user_update', 100).nullable();
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('threads');
};

module.exports = {up, down}