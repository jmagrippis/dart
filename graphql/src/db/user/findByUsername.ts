import { query } from '../pool'

const sql = 'SELECT * FROM users WHERE username = $1 LIMIT 1'

export const findByUsername = async (username): Promise<DbUser | void> => {
  const {
    rows: [user]
  } = await query(sql, [username])

  // @ts-ignore
  return user
}
