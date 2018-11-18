const userFactory = require('./factories/user')

const user = userFactory({
  username: 'jmagrippis',
  data: {
    email: 'j@magrippis.com',
    displayName: 'Johnny',
    greeting:
      'Hi! I am the Digital Automated Response Tool for Johnny. How may I help you?'
  }
})

module.exports = user
