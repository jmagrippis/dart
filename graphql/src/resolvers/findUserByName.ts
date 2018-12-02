import { findByName } from '../db/users/findByName'

export const findUserByName = async (_, { givenName, lastName }) => {
  const dbUser = await findByName({ givenName, lastName })
  if (!dbUser) return null

  const { id, data, ...restProps } = dbUser

  return {
    id,
    ...restProps,
    ...data
  }
}
