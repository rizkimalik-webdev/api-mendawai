
exports.seed = function (knex) {
    return knex('status').truncate()
        .then(function () {
            return knex('status').insert([
                { status: 'Open', description: 'Ticket Open', icon: 'fa fa-folder-open' },
                { status: 'Pending', description: 'Ticket Pending', icon: 'fa fa-spinner' },
                { status: 'Progress', description: 'Ticket Progress', icon: 'fa fa-recycle' },
                { status: 'Closed', description: 'Ticket Closed', icon: 'fa fa-clipboard-check' },
            ]);
        });
}
