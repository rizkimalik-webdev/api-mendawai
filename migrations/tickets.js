
const up = function(knex) {
    return knex.schema.createTable('tickets', function(table){
        table.increments('id').primary();
        table.string('customer_id', 100).unique().notNullable();
        table.bigInteger('ticket_number', 100).notNullable();
        table.string('group_ticket_number', 100);
        table.string('ticket_source', 100).notNullable();
        table.string('status', 50).notNullable();
        table.text('detail_complaint');
        table.text('response_complaint');
        table.integer('SLA');
        table.string('ticket_position', 5);
        table.string('closed_by', 5);
        table.string('send_email', 5);
        table.string('send_email_layer', 5);
        table.integer('divisi', 10);
        table.string('user_create', 100);
        table.string('user_update', 100);
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('tickets');
};

module.exports = {up, down}