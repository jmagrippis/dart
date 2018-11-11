const { describe, cy, before } = global

describe('User', () => {
  const user = {
    username: 'johnny',
    displayName: 'Johnny'
  }

  before(() => {
    cy.visit(`/u/${user.username}`)
  })

  it('loads', () => {
    cy.title().should('equal', `DART - ${user.displayName}`)
  })

  xit('has a welcome message', () => {
    cy.get('[data-test="input-question"]').type('Hello!')

    cy.get('[data-test="response"]:first').should(
      'contain',
      'Hi! I am the Digital Automated Response system for Johnny. How can I help you?'
    )
  })

  xit('responds to a hello', () => {
    cy.get('[data-test="input-question"]').type('Hello!')

    cy.get('[data-test="question"]:first').should('contain', 'Hello!')

    cy.get('[data-test="response"]:nth-child(2)').should('contain', 'Hi!')
  })
})
