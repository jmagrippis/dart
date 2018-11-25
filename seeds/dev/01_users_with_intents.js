const faker = require('faker')

const userFactory = require('../factories/user')
const intentFactory = require('../factories/intent')
const user = require('../user')
const intent = require('../intent')

const USERS = 'users'
const INTENTS = 'intents'

exports.seed = async function(knex) {
  await knex(USERS).del()

  const users = [user, ...[...Array(5).keys()].map(userFactory)]

  await knex(USERS).insert(users)

  const intents = users.reduce(
    (acc, u) => [...acc, ...[...Array(5).keys()].map(intentFactory(u))],
    [intent]
  )

  return knex(INTENTS).insert(intents)
}
