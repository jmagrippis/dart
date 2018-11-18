const faker = require('./faker')

const factory = ({ data, ...partial }) => ({
  username: faker.internet.userName(),
  created_at: faker.date.recent(),
  data: {
    email: faker.internet.email(),
    displayName: faker.random.uuid(),
    greeting: faker.lorem.sentences(),
    ...data
  },
  ...partial
})

module.exports = factory
