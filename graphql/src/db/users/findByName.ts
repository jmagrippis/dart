import { query } from '../pool'
import { DbUser } from '../types'

const sql =
  "SELECT * from users WHERE dmetaphone(data ->> 'givenName') = dmetaphone($1) AND dmetaphone(data ->> 'lastName') = dmetaphone($2)"

export const findByName = async ({
  givenName,
  lastName
}: {
  givenName: string
  lastName: string
}): Promise<DbUser | void> => {
  const {
    rows: [user]
  } = await query(sql, [givenName, lastName])

  // @ts-ignore
  return user
}
