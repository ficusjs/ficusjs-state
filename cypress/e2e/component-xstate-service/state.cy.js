/* global expect describe cy before it */
/* eslint-disable no-unused-expressions */
describe('Component XState service', () => {
  before(() => {
    cy.visit('component-xstate-service')
  })

  describe('a checkbox state machine', () => {
    it('checkbox rendered', () => {
      cy.get('mock-state-chart')
        .should('have.length', 1)
    })
    it('view component rendered', () => {
      cy.get('mock-state-chart-view')
        .should('have.length', 1)
    })

    it('view component shows the initial state', () => {
      cy.get('mock-state-chart-view')
        .should('have.text', 'Current state: inactive')
    })

    describe('click the checkbox', () => {
      before(() => {
        cy.get('#horns').click()
      })

      it('view component shows the active state', () => {
        cy.get('mock-state-chart-view')
          .should('have.text', 'Current state: active')
      })
    })

    describe('click the checkbox', () => {
      before(() => {
        cy.get('#horns').click()
      })

      it('view component shows the inactive state', () => {
        cy.get('mock-state-chart-view')
          .should('have.text', 'Current state: inactive')
      })
    })
  })
})
