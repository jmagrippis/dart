import { query } from '../pool'
import { DbUser } from '../types'

const sql = 'SELECT * FROM users WHERE username = $1 LIMIT 1'

export const findByUsername = async (
  username: string
): Promise<DbUser | void> => {
  const {
    rows: [user]
  } = await query(sql, [username])

  // @ts-ignore
  return user
}
