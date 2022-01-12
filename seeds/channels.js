
exports.seed = function (knex) {
    return knex('channels').truncate()
        .then(function () {
            return knex('channels').insert([
                { channel: 'Voice' },
                { channel: 'Email' },
                { channel: 'Chat' },
                { channel: 'Facebook' },
                { channel: 'Twitter' },
                { channel: 'Instagram' },
                { channel: 'Whatsapp' },
            ]);
        });
}
