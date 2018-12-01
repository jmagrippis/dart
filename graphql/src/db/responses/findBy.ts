import { query } from '../pool'
import { DbResponse } from '../types'

const sqlWithParentId =
  'SELECT * FROM responses WHERE user_id = $1 AND topic_id = $2 AND parent_id = $3'

const sqlForNull =
  'SELECT * FROM responses WHERE user_id = $1 AND topic_id = $2 AND parent_id IS NULL'

export const findBy = async ({
  userId,
  topicId,
  parentResponseId = null
}): Promise<DbResponse[]> => {
  const [sql, args] = parentResponseId
    ? [sqlWithParentId, [userId, topicId, parentResponseId]]
    : [sqlForNull, [userId, topicId]]

  const { rows } = await query(sql, args)

  // @ts-ignore
  return rows
}
