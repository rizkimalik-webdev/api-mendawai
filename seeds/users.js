
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Administrator', username: 'admin', email_address: 'admin@mail.com', password: '12345', user_level: 'Admin'},
      ]);
    });
}
