import { query } from '../pool'
import { DbMessage } from '../types'

const sql =
  'INSERT INTO messages("conversationId", data) VALUES($1, $2) RETURNING *'

export const create = async ({ conversationId, data }): Promise<DbMessage> => {
  const {
    rows: [message]
  } = await query(sql, [conversationId, data])

  // @ts-ignore
  return message
}
