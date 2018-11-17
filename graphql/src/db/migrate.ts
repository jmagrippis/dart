import path from 'path'
import pgMigrate from 'node-pg-migrate'

import { config } from './config'

const dir = path.resolve(process.cwd(), 'migrations')

export const migrate = pgMigrate.bind(undefined, {
  dir,
  databaseUrl: config.host,
  direction: 'up',
  migrationsTable: 'migrations'
})
