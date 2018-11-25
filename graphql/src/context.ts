import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const AUTH_DOMAIN = 'dart.eu.auth0.com'
const AUTH_CLIENT_ID = 'TNDRNXb-YiZjcmg3yO7pyU57eL_BYr4t'

const client = jwksClient({
  jwksUri: `https://${AUTH_DOMAIN}/.well-known/jwks.json`
})

function getKey(header, cb) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey
    cb(null, signingKey)
  })
}

const options = {
  audience: AUTH_CLIENT_ID,
  issuer: `https://${AUTH_DOMAIN}/`,
  algorithms: ['RS256']
}

export const context = ({ req }) => {
  const token = req.headers.authorization

  return {
    auth: new Promise((resolve) => {
      jwt.verify(token, getKey, options, (err, decoded: { email: string }) => {
        if (err) {
          return resolve({})
        }
        resolve({ email: decoded.email })
      })
    })
  }
}
