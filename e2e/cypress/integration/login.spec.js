const { describe, cy } = global

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads', () => {
    cy.title().should('equal', 'Digital Self Assistant')
  })
})
