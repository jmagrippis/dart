import { query } from '../pool'

const sql =
  "SELECT data -> 'greeting' AS greeting FROM users WHERE id = $1 LIMIT 1"

export const getGreeting = async (id): Promise<string> => {
  const {
    rows: [user]
  } = await query(sql, [id])

  // @ts-ignore
  return user.greeting
}
