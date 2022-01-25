
const up = function(knex) {
    return knex.schema.createTable('ticket_detail', function(table){
        table.increments('id').primary();
        table.string('ticket_number', 50).notNullable();
        table.string('cust_name', 50);
        table.string('cust_email', 50);
        table.string('cust_telephone', 50);
        table.text('cust_address');
        table.string('account_no', 50);
        table.string('thread_id', 50);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('ticket_detail');
};

module.exports = {up, down}