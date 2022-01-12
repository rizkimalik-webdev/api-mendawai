
const up = function(knex) {
    return knex.schema.createTable('channels', function(table){
        table.increments('id').primary();
        table.string('channel', 50);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('channels');
};

module.exports = {up, down}