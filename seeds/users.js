
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'rowValue1', username: 'red', email: 'red@gmail.com', password: '123', level: 'asd'},
      ]);
    });
}
