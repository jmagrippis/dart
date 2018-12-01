const faker = require('faker')

const userFactory = require('../factories/user')
const intentFactory = require('../factories/intent')
const topicFactory = require('../factories/topic')
const responseFactory = require('../factories/response')
const user = require('../user')
const intent = require('../intent')

const USERS = 'users'
const INTENTS = 'intents'
const TOPICS = 'topics'
const RESPONSES = 'responses'

exports.seed = async function(knex) {
  await knex(USERS).del()

  const users = [user, ...[...Array(5).keys()].map(userFactory)]

  await knex(USERS).insert(users)

  const intents = users.reduce(
    (acc, u) => [...acc, ...[...Array(5).keys()].map(intentFactory(u))],
    [intent]
  )

  await knex(INTENTS).insert(intents)

  const topics = users.reduce(
    (acc, u) => [...acc, ...[...Array(5).keys()].map(topicFactory(u))],
    []
  )

  await knex(TOPICS).insert(topics)

  const responses = topics.reduce(
    (acc, t) => [...acc, ...[...Array(5).keys()].map(responseFactory(t))],
    []
  )

  await knex(RESPONSES).insert(responses)
}
