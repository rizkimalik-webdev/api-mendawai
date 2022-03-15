
exports.seed = function (knex) {
    return knex('departments').truncate()
        .then(function () {
            return knex('departments').insert([
                { department_name: 'Contact Center', description: 'test'},
                { department_name: 'Customer Service', description: 'test' },
                { department_name: 'Quality Assurance', description: 'test' },
            ]);
        });
}
