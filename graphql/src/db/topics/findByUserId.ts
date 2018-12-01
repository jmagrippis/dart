import { query } from '../pool'
import { DbTopic } from '../types'

const sql = 'SELECT * FROM topics WHERE user_id = $1'

export const findByUserId = async (userId: string): Promise<DbTopic[]> => {
  const { rows } = await query(sql, [userId])

  // @ts-ignore
  return rows
}
