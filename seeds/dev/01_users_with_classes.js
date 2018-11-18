const faker = require('faker')

const userFactory = require('../factories/user')
const classFactory = require('../factories/class')
const user = require('../user')
const c = require('../class')

const USERS = 'users'
const CLASSES = 'classes'

exports.seed = async function(knex) {
  await knex(USERS).del()

  const users = [user, ...[...Array(5).keys()].map(userFactory)]

  await knex(USERS).insert(users)

  const classes = users.reduce(
    (acc, u) => [...acc, ...[...Array(5).keys()].map(classFactory(u))],
    [c]
  )

  return knex(CLASSES).insert(classes)
}
