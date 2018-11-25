const userFactory = require('./factories/user')

const user = userFactory({
  id: 'f38feb28-3865-45f5-99d5-85432c3da37a',
  username: 'jmagrippis',
  email: 'e2e@example.com',
  data: {
    displayName: 'Johnny',
    greeting:
      'Hi! I am the Digital Automated Response Tool for Johnny. How may I help you?'
  }
})

module.exports = user
