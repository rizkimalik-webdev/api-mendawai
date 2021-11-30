
const up = function(knex) {
    return knex.schema.createTable('chats_end', function(table){
        table.integer('id');
        table.bigInteger('chat_id', 50).notNullable();
        table.bigInteger('user_id', 50).notNullable();
        table.bigInteger('ticket_number', 50);
        table.bigInteger('page_id', 50);
        table.bigInteger('customer_id', 50).notNullable();
        table.string('name', 100);
        table.string('email', 100);
        table.string('flag_to', 50);
        table.text('message');
        table.timestamp('date_create');
        table.string('status_chat', 50);
        table.string('flag_end', 5);
        table.string('agent_handle', 50);
        table.string('channel', 50);
        table.string('post_id', 100);
        table.string('comment_id', 100);
        table.string('reply_id', 100);
        table.string('flag_notif', 5);
        table.string('CNT', 5);
        table.timestamp('date_assign');
        table.string('agent_id', 100);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('chats_end');
};

module.exports = {up, down}