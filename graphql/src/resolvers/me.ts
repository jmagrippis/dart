import { findByEmail } from '../db/users/findByEmail'

export const me = async (_, __, { auth }) => {
  const { email } = await auth

  if (!email) return null

  const dbUser = await findByEmail(email)

  if (!dbUser) return null

  return { ...dbUser, ...dbUser.data }
}
