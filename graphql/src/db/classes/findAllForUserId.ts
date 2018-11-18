import { query } from '../pool'
import { DbClass } from '../types'

const sql = 'SELECT * FROM classes WHERE user_id = $1'

export const findAllForUserId = async (userId): Promise<DbClass[]> => {
  const { rows } = await query(sql, [userId])

  // @ts-ignore
  return rows
}
