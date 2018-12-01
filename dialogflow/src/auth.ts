export const auth = (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [user, password] = new Buffer(b64auth, 'base64').toString().split(':')

  if (
    !user ||
    !password ||
    user !== process.env.DIALOGFLOWUSER ||
    password !== process.env.DIALOGFLOWPASSWORD
  ) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  next()
}
