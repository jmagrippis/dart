import fetch from 'node-fetch'

const AUTH_DOMAIN = 'dart.eu.auth0.com'

const authUrl = `https://${AUTH_DOMAIN}/userinfo`

export interface Auth0User {
  sub: string
  given_name: string
  family_name: string
  nickname: string
  name: string
  picture: string
  gender: string
  locale: string
  updated_at: string
  email: string
  email_verified: boolean
}

export interface Context {
  auth: Promise<Auth0User>
}

const getAuth = async (req): Promise<Auth0User> => {
  const authorization = req.headers.authorization

  const response = await fetch(authUrl, {
    headers: { authorization }
  })

  if (!response || !response.ok) {
    return
  }

  const auth = await response.json()

  return auth
}

export const context = async ({ req }): Promise<Context> => {
  return { auth: getAuth(req) }
}
