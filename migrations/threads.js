
const up = function(knex) {
    return knex.schema.createTable('threads', function(table){
        table.increments('id').primary();
        table.string('value_thread', 100).notNullable();
        table.string('genesys_number', 100).notNullable();
        table.string('thread_id', 100);
        table.string('account', 150);
        table.string('account_contact_id', 150);
        table.string('agent_id', 100);
        table.text('subject');
        table.string('ticket_number', 100);
        table.string('type', 20);
        table.text('thread_reason');
        table.string('customer_id', 100);
        table.string('phone_chat', 100);
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('threads');
};

module.exports = {up, down}