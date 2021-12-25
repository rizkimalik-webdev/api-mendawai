
exports.seed = function (knex) {
    return knex('user_level').truncate()
        .then(function () {
            return knex('user_level').insert([
                { level_name: 'Layer1', description: 'Level L1 CS Agents' },
                { level_name: 'Layer2', description: 'Level CS Team Leaders / Case Unit' },
                { level_name: 'Layer3', description: 'Level Layer 3 / PIC' },
                { level_name: 'Supervisor', description: 'Level Supervisor' },
                { level_name: 'Administrator', description: 'Level Administrator' },
            ]);
        });
}
