const intentFactory = require('./factories/intent')
const user = require('./user')

const intent = intentFactory(user)({
  name: 'tell me about this skill',
  data: {
    entities: {
      graphql: {
        name: 'graphql',
        response: 'Because REST is not hipster enough nowadays.'
      }
    }
  }
})

module.exports = intent
