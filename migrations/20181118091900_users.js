const USERS = 'users'

exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .createTable(USERS, function(table) {
      table
        .uuid('id')
        .notNullable()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))

      table
        .string('username')
        .notNullable()
        .unique()

      table
        .string('email')
        .notNullable()
        .unique()

      table.timestamp('created_at').defaultTo(knex.fn.now())

      table.jsonb('data').notNullable()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable(USERS)
}
