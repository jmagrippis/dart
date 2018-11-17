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

  it('has a welcome message', () => {
    cy.get('[data-test="response"]:first').should(
      'contain',
      'Hi! I am the Digital Automated Response Tool for Johnny. How may I help you?'
    )
  })

  it('responds to a question', () => {
    cy.get('[data-test="question-input"]').type('Whereabouts do you live?')
    cy.get('[data-test="question-submit"]').click()

    cy.get('[data-test="request"]:first').should(
      'contain',
      'Whereabouts do you live?'
    )

    cy.get('[data-test="response"]:nth-child(2)').should(
      'contain',
      'I live in beautiful London!'
    )
  })
})
