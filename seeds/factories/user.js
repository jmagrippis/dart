const faker = require('./faker')

const factory = ({ data, ...partial }) => ({
  id: faker.random.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  created_at: faker.date.recent(),
  data: {
    displayName: faker.name.findName(),
    greeting: faker.lorem.sentences(),
    ...data
  },
  ...partial
})

module.exports = factory
