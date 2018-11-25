const INTENTS = 'intents'

exports.up = function(knex) {
  return knex.schema.createTable(INTENTS, function(table) {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('name').notNullable()

    table.uuid('user_id').notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.jsonb('data').notNullable()

    table.index(['user_id', 'name'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(INTENTS)
}
