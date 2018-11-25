const { describe, cy, before } = global

describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('offers you to login', () => {
    cy.title().should('equal', 'Digital Auto Response Tool')

    cy.get('[data-test="login"]').should('exist')
  })
})
