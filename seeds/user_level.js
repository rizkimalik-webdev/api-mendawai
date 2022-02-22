
exports.seed = function (knex) {
    return knex('user_level').truncate()
        .then(function () {
            return knex('user_level').insert([
                { level_name: 'Layer1', description: 'Level CS Agents' },
                { level_name: 'Layer2', description: 'Level CS Team Leaders' },
                { level_name: 'Layer3', description: 'Level Case Unit / PIC' },
                { level_name: 'Supervisor', description: 'Level Supervisor' },
                { level_name: 'Administrator', description: 'Level Administrator' },
            ]);
        });
}
