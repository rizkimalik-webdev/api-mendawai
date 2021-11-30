
const up = function(knex) {
    return knex.schema.createTable('menu', function(table){
        table.increments('menu_id').primary();
        table.string('menu_name', 100);
        table.integer('number', 10);
        table.string('path', 100);
        table.string('icon', 100);
        table.boolean('is_root');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('menu');
};

export {up, down}
