const { Cypress, cy } = global

// You need a valid access token for the e2e user for the login flow to work.
const token = 'Ys8ITtTjslUCUUbpGbGoVQRxtM9hZP86'

Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({ name: 'login' })

  const options = {
    method: 'GET',
    url: 'http://localhost:3000/auth'
  }

  // allow us to override defaults with passed in overrides

  cy.request(options).then((res) => {
    expect(res.status).to.eq(200)

    window.localStorage.setItem('token', token)
  })
})
