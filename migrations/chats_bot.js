
const up = function(knex) {
    return knex.schema.createTable('chats_bot', function(table){
        table.increments('id').primary();
        table.string('chat_id', 50).notNullable();
        table.string('user_id', 50).notNullable();
        table.string('customer_id', 50).notNullable();
        table.string('name', 100);
        table.string('email', 100);
        table.string('flag_to', 50);
        table.text('message');
        table.timestamp('date_create');
        table.string('status_chat', 50);
        table.string('flag_end', 1);
        table.string('agent_handle', 50);
        table.timestamp('date_assign');
        table.string('channel', 50);
        table.string('ticket_number', 50);
        table.string('page_id', 50);
        table.string('post_id', 100);
        table.string('comment_id', 100);
        table.string('reply_id', 100);
        table.string('flag_notif', 1);
        table.string('cnt', 1);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('chats_bot');
};

module.exports = {up, down}