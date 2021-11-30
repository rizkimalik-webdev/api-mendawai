
const up = function (knex) {
    // return knex.schema.alterTable('users', function (table) {
    //     table.integer('group', 5);
    // })

};


const down = function (knex) {
    // return knex.schema.table('users', function (table) {
    //     table.dropColumn('group')
    // })

};
export {up, down}