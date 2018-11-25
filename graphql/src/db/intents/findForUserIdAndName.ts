import { query } from '../pool'
import { DbIntent } from '../types'

const sql = 'SELECT * FROM intents WHERE user_id = $1 AND name = $2'

export const findForUserIdAndName = async ({
  name,
  userId
}): Promise<DbIntent> => {
  const {
    rows: [intent]
  } = await query(sql, [userId, name])

  // @ts-ignore
  return intent
}
