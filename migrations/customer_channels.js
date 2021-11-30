
const up = function(knex) {
    return knex.schema.createTable('customer_channels', function(table){
        table.increments('id').primary();
        table.string('customer_id', 100).unique().notNullable();
        table.string('flag_channel', 50);
        table.string('value_channel');
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('customer_channels');
};

export {up, down}