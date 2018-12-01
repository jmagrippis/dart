const faker = require('./faker')

const factory = (user) => ({ data, ...partial }) => ({
  id: faker.random.uuid(),
  name: faker.random.word(),
  user_id: user.id,
  created_at: faker.date.recent(),
  data: {
    ...data
  },
  ...partial
})

module.exports = factory
