
exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table){
        table.increments('id').primary();
        table.string('customer_id', 100).unique().notNullable();
        table.string('tittle', 50);
        table.string('name');
        table.string('no_ktp', 50);
        table.timestamp('birth');
        table.string('gender', 50);
        table.string('telephone', 50);
        table.string('email', 50);
        table.string('address');
        table.string('city', 50);
        table.string('region', 50);
        table.string('status', 50);
        table.timestamps();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
