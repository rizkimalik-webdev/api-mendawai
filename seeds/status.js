
exports.seed = function (knex) {
    return knex('status').truncate()
        .then(function () {
            return knex('status').insert([
                { status: 'Open', description: 'Ticket Open' },
                { status: 'Pending', description: 'Ticket Pending' },
                { status: 'Progress', description: 'Ticket Progress' },
                { status: 'Closed', description: 'Ticket Closed' },
            ]);
        });
}
