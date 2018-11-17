exports.shorthands = undefined

const USERS = 'users'
const CONVERSATIONS = 'conversations'
const MESSAGES = 'messages'

exports.up = pgm => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true })

  const id = {
    type: 'uuid',
    primaryKey: true,
    default: pgm.func('uuid_generate_v4 ()')
  }

  const data = {
    type: 'json'
  }

  const created_at = {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp')
  }

  pgm.createTable(USERS, {
    id,
    data,
    created_at,
    username: { type: 'varchar(255)', notNull: true, unique: true }
  })
  pgm.createIndex(USERS, 'username')

  pgm.createTable(CONVERSATIONS, {
    id,
    data,
    created_at,
    subject_id: {
      type: 'uuid',
      notNull: true,
      references: USERS,
      onDelete: 'cascade'
    },
    interviewer_id: {
      type: 'uuid',
      notNull: true
    }
  })
  pgm.createIndex(CONVERSATIONS, ['subject_id', 'interviewer_id'])

  pgm.createTable(MESSAGES, {
    id,
    data,
    created_at,
    conversation_id: {
      type: 'uuid',
      notNull: true,
      references: CONVERSATIONS,
      onDelete: 'cascade'
    }
  })
  pgm.createIndex(MESSAGES, 'conversation_id')
}

exports.down = pgm => {
  pgm.dropTable(MESSAGES)
  pgm.dropTable(CONVERSATIONS)
  pgm.dropTable(USERS)
}
