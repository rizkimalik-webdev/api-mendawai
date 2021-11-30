
const up = function(knex) {
    return knex.schema.createTable('sosmed_feeds', function(table){
        table.increments('id').primary();
        table.bigInteger('post_id', 50);
        table.bigInteger('page_id', 50);
        table.string('page_name', 150);
        table.string('channel', 100);
        table.text('message');
        table.timestamp('date_create');
        table.string('permalink_url');
        table.string('source', 100);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('sosmed_feeds');
};

export {up, down}