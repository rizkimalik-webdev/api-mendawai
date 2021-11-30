
const up = function(knex) {
    return knex.schema.createTable('menu_modul', function(table){
        table.increments('menu_modul_id').primary();
        table.integer('menu_id', 10);
        table.string('menu_modul_name', 100);
        table.integer('number', 10);
        table.string('path', 100);
        table.string('icon', 100);
        table.boolean('is_root');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('menu_modul');
};

module.exports = {up, down}

