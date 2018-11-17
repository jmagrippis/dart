import { query } from '../pool'
import { DbMessage } from '../types'

const sql =
  'SELECT * FROM messages WHERE "conversationId" = $1 ORDER BY "createdAt"'

export const findForConversationId = async (
  conversationId
): Promise<DbMessage[]> => {
  const { rows } = await query(sql, [conversationId])

  // @ts-ignore
  return rows
}
