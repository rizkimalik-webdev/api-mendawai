
const up = function(knex) {
    return knex.schema.createTable('sosmed_channels', function(table){
        table.increments('id').primary();
        table.string('page_id', 50);
        table.string('page_name', 150);
        table.string('page_category', 150);
        table.string('channel', 100);
        table.string('account_id', 50);
        table.text('token');
        table.text('token_secret');
        table.text('user_secret');
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('sosmed_channels');
};

module.exports = {up, down}