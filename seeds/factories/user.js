const faker = require('./faker')

const factory = ({ data, ...partial }) => ({
  id: faker.random.uuid(),
  username: faker.internet.userName(),
  created_at: faker.date.recent(),
  data: {
    email: faker.internet.email(),
    displayName: faker.name.findName(),
    greeting: faker.lorem.sentences(),
    ...data
  },
  ...partial
})

module.exports = factory
