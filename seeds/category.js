
exports.seed = function (knex) {
    return knex('category').truncate()
        .then(function () {
            return knex('category').insert([
                { category_id: 'CAT-10001', name: 'Complaint' },
                { category_id: 'CAT-10002', name: 'Feedback' },
                { category_id: 'CAT-10003', name: 'Information' },
                { category_id: 'CAT-10004', name: 'Request' },
            ]);
        });
}
