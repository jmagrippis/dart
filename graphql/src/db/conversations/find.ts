import { query } from '../pool'
import { DbConversation } from '../types'

const sql = 'SELECT * FROM conversations WHERE id = $1 LIMIT 1'

export const find = async (id): Promise<DbConversation | void> => {
  const {
    rows: [conversation]
  } = await query(sql, [id])

  // @ts-ignore
  return conversation
}
