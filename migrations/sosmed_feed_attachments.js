
const up = function(knex) {
    return knex.schema.createTable('sosmed_feed_attachments', function(table){
        table.increments('id').primary();
        table.bigInteger('post_id', 50);
        table.bigInteger('page_id', 50);
        table.string('page_name', 150);
        table.string('channel', 100);
        table.string('file_name');
        table.string('file_type', 50);
        table.text('file_path');
        table.timestamp('date_create');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('sosmed_feed_attachments');
};

export {up, down}