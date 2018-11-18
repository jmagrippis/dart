const faker = require('./faker')

const factory = (user) => ({ data, ...partial }) => ({
  name: faker.random.word(),
  user_id: user.id,
  created_at: faker.date.recent(),
  data: {
    response: faker.lorem.sentences(),
    autocomplete: faker.random.boolean(),
    ...data
  },
  ...partial
})

module.exports = factory
