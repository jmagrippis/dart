const { describe, cy, before } = global

describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('loads', () => {
    cy.title().should('equal', 'Digital Self Assistant')
  })

  it('logs into the account page', () => {
    cy.get('[data-test="login"]').click()
    cy.url().should('contain', 'me')
  })
})
