
const up = function(knex) {
    return knex.schema.createTable('menu_submodul', function(table){
        table.increments('menu_submodul_id').primary();
        table.integer('menu_id', 10);
        table.integer('menu_modul_id', 10);
        table.string('menu_submodul_name', 100);
        table.integer('number', 10);
        table.string('path', 100);
        table.string('icon', 100);
    })
};

const down = function(knex) {
    return knex.schema.dropTable('menu_submodul');
};

module.exports = {up, down}