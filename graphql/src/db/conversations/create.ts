import { query } from '../pool'
import { DbConversation } from '../types'

const sql =
  'INSERT INTO conversations("subjectId", "interviewerId") VALUES($1, $2) RETURNING *'

export const create = async ({
  subjectId,
  interviewerId
}): Promise<DbConversation> => {
  const {
    rows: [message]
  } = await query(sql, [subjectId, interviewerId])

  // @ts-ignore
  return message
}
