
const up = function(knex) {
    return knex.schema.createTable('ticket_detail', function(table){
        table.increments('id').primary();
        table.bigInteger('ticket_number', 100).notNullable();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('ticket_detail');
};

export {up, down}