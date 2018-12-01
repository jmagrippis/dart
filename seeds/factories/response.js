const faker = require('./faker')

const factory = (topic) => ({ data, ...partial }) => ({
  name: faker.random.word(),
  user_id: topic.user_id,
  topic_id: topic.id,
  created_at: faker.date.recent(),
  data: {
    content: faker.lorem.sentences(),
    ...data
  },
  ...partial
})

module.exports = factory
