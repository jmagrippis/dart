const CONVERSATIONS = 'conversations'

exports.up = function(knex) {
  return knex.schema.createTable(CONVERSATIONS, function(table) {
    table
      .uuid('id')
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.uuid('subject_id').notNullable()
    table
      .foreign('subject_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

    table.uuid('interviewer_id').notNullable()

    table
      .timestamp('created_at')
      .index()
      .defaultTo(knex.fn.now())

    table.jsonb('data')

    table.index(['subject_id', 'interviewer_id'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(CONVERSATIONS)
}
