
const up = function(knex) {
    return knex.schema.createTable('tickets', function(table){
        table.increments('id').primary();
        table.string('customer_id', 50).notNullable();
        table.string('ticket_number', 50).notNullable();
        table.string('group_ticket_number', 50);
        table.string('ticket_source', 50).notNullable();
        table.string('status', 50).notNullable();
        table.string('category_id', 20);
        table.string('category_sublv1_id', 20);
        table.string('category_sublv2_id', 20);
        table.string('category_sublv3_id', 20);
        table.text('complaint_detail');
        table.text('response_detail');
        table.integer('sla');
        table.string('ticket_position', 5);
        table.integer('org_id', 5);
        table.string('type_customer', 50);
        table.string('priority_scale', 50);
        table.string('source_information', 50);
        table.string('type_complaint', 50);
        table.string('user_create', 50);
        table.timestamp('date_create');
        table.string('user_closed', 50);
        table.timestamp('date_closed');
        // table.string('user_solved', 50);
        // table.timestamp('date_solved');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('tickets');
};

module.exports = {up, down}