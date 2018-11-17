import { query } from '../pool'
import { DbConversation } from '../types'

const sql =
  'SELECT id FROM conversations WHERE subject_id = $1 AND interviewer_id = $2 LIMIT 1'

export const findByPair = async ({
  subjectId,
  interviewerId
}): Promise<DbConversation | void> => {
  const {
    rows: [conversation]
  } = await query(sql, [subjectId, interviewerId])

  // @ts-ignore
  return conversation
}
