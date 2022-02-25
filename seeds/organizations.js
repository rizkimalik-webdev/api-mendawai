
exports.seed = function (knex) {
    return knex('organizations').truncate()
        .then(function () {
            return knex('organizations').insert([
                { organization_name: 'Finance', description: 'Team Finance'},
                { organization_name: 'Technical', description: 'Team Technical' },
                { organization_name: 'Human Resource', description: 'Team Human Resource' },
                { organization_name: 'Marketing', description: 'Team Marketing' },
            ]);
        });
}
