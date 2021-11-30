
const up = function(knex) {
    return knex.schema.createTable('chat_attachments', function(table){
        table.increments('id').primary();
        table.bigInteger('customer_id', 50).notNullable();
        table.bigInteger('chat_id', 50).notNullable();
        table.text('file_name');
        table.string('file_type', 100);
        table.text('file_path');
        table.string('user_create', 100);
        table.timestamp('created_at');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('chat_attachments');
};

module.exports = {up, down}