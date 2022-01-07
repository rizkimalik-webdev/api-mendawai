
const up = function(knex) {
    return knex.schema.createTable('ticket_sla', function(table){
        table.increments('id').primary();
        table.integer('jumlah_sla', 5);
        table.string('color_sla', 20);
        table.text('description');
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('ticket_sla');
};

module.exports = {up, down}