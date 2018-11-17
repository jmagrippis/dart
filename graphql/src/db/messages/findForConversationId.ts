import { query } from '../pool'
import { DbMessage } from '../types'

const sql =
  'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at'

export const findForConversationId = async (
  conversationId
): Promise<DbMessage[]> => {
  const { rows } = await query(sql, [conversationId])

  // @ts-ignore
  return rows
}
