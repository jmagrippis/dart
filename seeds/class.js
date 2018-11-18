const classFactory = require('./factories/class')
const user = require('./user')

const c = classFactory(user)({
  name: 'meaning',
  data: {
    response: '42',
    autocomplete: true
  }
})

module.exports = c
