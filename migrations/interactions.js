
const up = function(knex) {
    return knex.schema.createTable('interactions', function(table){
        table.increments('id').primary();
        table.string('ticket_number').notNullable();
        table.string('genesys_id', 50);
        table.string('thread_id', 50);
        table.text('response_complaint');
        table.string('status', 50);
        table.string('channel', 50);
        table.string('user_create', 100);
        table.timestamp('created_at');
        table.string('first_create', 10);
        table.string('dispatch_ticket', 10);
        table.string('dispatch_to_layer', 10);
        table.string('dispatch_to_dept', 10);
        table.string('dispatch_to_user', 10);
        table.string('interaction_type', 50);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('interactions');
};

module.exports = {up, down}