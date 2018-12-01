const RESPONSES = 'responses'

exports.up = function(knex) {
  return knex.schema.createTable(RESPONSES, function(table) {
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

    table.uuid('topic_id').notNullable()
    table
      .foreign('topic_id')
      .references('id')
      .inTable('topics')
      .onDelete('CASCADE')

    table.uuid('parent_id')
    table
      .foreign('parent_id')
      .references('id')
      .inTable(RESPONSES)
      .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now())

    table.jsonb('data').notNullable()

    table.index(['user_id', 'topic_id', 'parent_id', 'name'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(RESPONSES)
}
