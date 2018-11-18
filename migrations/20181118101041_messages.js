const MESSAGES = 'messages'

exports.up = function(knex) {
  return knex.schema.createTable(MESSAGES, function(table) {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.uuid('conversation_id').notNullable()
    table
      .foreign('conversation_id')
      .references('id')
      .inTable('conversations')
      .onDelete('CASCADE')

    table
      .timestamp('created_at')
      .index()
      .defaultTo(knex.fn.now())

    table.jsonb('data').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(MESSAGES)
}
