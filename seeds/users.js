
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Administrator', username: 'admin', email_address: 'admin@mail.com', password: '123456', user_level: 'Administrator'},
      ]);
    });
}
