
exports.seed = function (knex) {
    return knex('organizations').truncate()
        .then(function () {
            return knex('organizations').insert([
                { organization_name: 'Finance', description: 'Team Finance', email: 'finance@mendawai.com' },
                { organization_name: 'Technical', description: 'Team Technical', email: 'technical@mendawai.com' },
                { organization_name: 'Human Resource', description: 'Team Human Resource', email: 'hrd@mendawai.com' },
                { organization_name: 'Marketing', description: 'Team Marketing', email: 'marketing@mendawai.com' },
            ]);
        });
}
