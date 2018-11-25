import { WebAuth } from 'auth0-js'

const AUTH_DOMAIN = 'dart.eu.auth0.com'
const AUTH_CLIENT_ID = 'TNDRNXb-YiZjcmg3yO7pyU57eL_BYr4t'

export const auth = new WebAuth({
  domain: AUTH_DOMAIN,
  clientID: AUTH_CLIENT_ID,
  redirectUri: `${process.env.REACT_APP_WEB}auth`,
  audience: `https://${AUTH_DOMAIN}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid email'
})
