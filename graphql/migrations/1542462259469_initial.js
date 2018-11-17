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

  pgm.createTable(USERS, {
    id,
    data,
    username: { type: 'varchar(255)', notNull: true },
    createdAt: {
      type: 'timestamp',
      unique: true,
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex(USERS, 'username')

  pgm.createTable(CONVERSATIONS, {
    id,
    data,
    subjectId: {
      type: 'uuid',
      notNull: true,
      references: USERS,
      onDelete: 'cascade'
    },
    interviewerId: {
      type: 'uuid',
      notNull: true
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex(CONVERSATIONS, ['subjectId', 'interviewerId'])

  pgm.createTable(MESSAGES, {
    id,
    data,
    conversationId: {
      type: 'uuid',
      notNull: true,
      references: CONVERSATIONS,
      onDelete: 'cascade'
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex(MESSAGES, 'conversationId')
}

exports.down = pgm => {
  pgm.dropTable(MESSAGES)
  pgm.dropTable(CONVERSATIONS)
  pgm.dropTable(USERS)
}
