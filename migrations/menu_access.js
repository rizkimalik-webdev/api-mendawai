
const up = function(knex) {
    return knex.schema.createTable('menu_access', function(table){
        table.increments('id').primary();
        table.string('user_id', 100);
        table.string('user_level', 100);
        table.integer('menu_id', 10);
        table.integer('menu_modul_id', 10);
        table.integer('menu_submodul_id', 10);
        table.string('user_create');
        table.timestamps();
    })
};

const down = function(knex) {
    return knex.schema.dropTable('menu_access');
};

module.exports = {up, down}