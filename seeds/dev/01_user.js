const faker = require('faker')

const userFactory = require('../factories/user')
const user = require('../user')

const USERS = 'users'

exports.seed = function(knex) {
  return knex(USERS)
    .del()
    .then(function() {
      return knex(USERS).insert([
        user,
        ...[...Array(5).keys()].map(userFactory)
      ])
    })
}
