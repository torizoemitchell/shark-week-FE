exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.integer('cycle_length').notNullable().defaultTo(0)
    table.timestamps(true, true)

  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
