
exports.seed = function (knex) {
    return knex('channels').truncate()
        .then(function () {
            return knex('channels').insert([
                { channel: 'Voice', icon: 'fa fa-headset'},
                { channel: 'Email', icon: 'fa fa-mail-bulk' },
                { channel: 'Chat', icon: 'fa fa-comments' },
                { channel: 'Facebook', icon: 'fab fa-facebook' },
                { channel: 'Twitter', icon: 'fab fa-twitter' },
                { channel: 'Instagram', icon: 'fab fa-instagram' },
                { channel: 'Whatsapp', icon: 'fab fa-whatsapp-square' },
            ]);
        });
}
