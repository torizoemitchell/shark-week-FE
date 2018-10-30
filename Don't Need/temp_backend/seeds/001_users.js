exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Your Mom', email: 'your_mom@gmail.com', cycle_length: 5, password: 'dontforgetyourjacket'},
        {id: 2, name: 'Sally', email: 'sally@sally.com', cycle_length: 4, password: 'whereisharry24'},
        {id: 3, name: 'Bruce Almighty', email: 'iamgod@heaven.com', cycle_length: 3, password: 'hailme'},
      ])
      .then(function() {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
      })
    })
}
