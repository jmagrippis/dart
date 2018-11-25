import { findByEmail } from '../db/users/findByEmail'
import { Context } from '../context'

export const me = async (_, __, { auth }: Context) => {
  const authResult = await auth

  if (!authResult || !authResult.email) return null

  const dbUser = await findByEmail(authResult.email)

  if (!dbUser) {
    return {
      email: authResult.email,
      id: authResult.sub,
      displayName: authResult.name,
      picture: authResult.picture
    }
  }

  return { ...dbUser, ...dbUser.data }
}
