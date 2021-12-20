
exports.seed = function (knex) {
    return knex('user_level').truncate()
        .then(function () {
            return knex('user_level').insert([
                { level_name: 'Layer1', description: 'Agent' },
                { level_name: 'Layer2', description: 'Case Unit' },
                { level_name: 'Layer3', description: 'PIC' },
                { level_name: 'Administrator', description: 'Administrator' },
                { level_name: 'Supervisor', description: 'Supervisor' },
            ]);
        });
}
