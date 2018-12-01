import express from 'express'
import bodyParser from 'body-parser'

import { auth } from './auth'
import { app } from './app'

const server = express()

server.use(auth)
server.use(bodyParser.json())

server.post('/', app)

const port = process.env.PORT

server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})
