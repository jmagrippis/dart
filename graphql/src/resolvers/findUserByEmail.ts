import { findByEmail } from '../db/users/findByEmail'

export const findUserByEmail = async (_, { email }) => {
  const dbUser = await findByEmail(email)
  if (!dbUser) return null

  const { id, username, data } = dbUser

  return {
    id,
    username,
    ...data
  }
}
