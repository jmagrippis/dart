import { query } from '../pool'
import { DbUser } from '../types'

const sql = 'SELECT * FROM users WHERE email = $1 LIMIT 1'

export const findByEmail = async (email: string): Promise<DbUser | void> => {
  const {
    rows: [user]
  } = await query(sql, [email])

  // @ts-ignore
  return user
}
