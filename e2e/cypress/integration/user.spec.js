const user = require('../../../seeds/user')
const c = require('../../../seeds/class')

const { describe, cy, before } = global

describe('User', () => {
  before(() => {
    cy.exec('cd .. && yarn dbSeed && cd e2e')
      .its('code')
      .should('eq', 0)

    cy.visit(`/u/${user.username}`)
  })

  it('loads', () => {
    cy.title().should('equal', `DART - ${user.data.displayName}`)
  })

  it('has a welcome message', () => {
    cy.get('[data-test="response"]:first').should('contain', user.data.greeting)
  })

  it('responds to a question', () => {
    cy.get('[data-test="question-input"]').type('What is the meaning of life?')
    cy.get('[data-test="question-submit"]').click()

    cy.get('[data-test="request"]:first').should(
      'contain',
      'Whereabouts do you live?'
    )

    cy.get('[data-test="response"]:nth-child(2)').should(
      'contain',
      c.data.response
    )
  })
})
