import { query } from '../pool'
import { DbResponse } from '../types'

const sql = 'SELECT * FROM responses WHERE id = $1 LIMIT 1'

export const find = async (id): Promise<DbResponse | void> => {
  const {
    rows: [response]
  } = await query(sql, [id])

  // @ts-ignore
  return response
}
