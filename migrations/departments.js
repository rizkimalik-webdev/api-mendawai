
const up = function(knex) {
    return knex.schema.createTable('departments', function(table){
        table.increments('id').primary();
        table.string('department_id', 100).unique().notNullable();
        table.string('department_name').notNullable();
        table.string('description');
    })
};

const down = function(knex) {
    return knex.schema.dropTable('departments');
};

export {up, down}