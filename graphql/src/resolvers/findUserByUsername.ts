import { findByUsername } from '../db/users/findByUsername'

export const findUserByUsername = async (_, { username }) => {
  const dbUser = await findByUsername(username)
  if (!dbUser) return null

  const { id, data } = dbUser

  return {
    id,
    username,
    ...data
  }
}
