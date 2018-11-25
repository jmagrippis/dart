const user = require('../../../seeds/user')

const { describe, cy, before } = global

describe('Me', () => {
  before(() => {
    cy.exec('cd .. && yarn dbSeed && cd e2e')
      .its('code')
      .should('eq', 0)

    cy.visit('/me')
  })

  it('Asks you to login if you are not', () => {
    cy.get('[data-test="login"]').should('exist')
  })

  it('shows your profile info if you are logged-in', () => {
    cy.login()

    cy.reload()

    cy.get('[data-test="username"]').should('contain', user.username)
    cy.get('[data-test="email"]').should('contain', user.email)
    cy.get('[data-test="displayName"]').should('contain', user.data.displayName)
  })
})
