/* global describe cy before it  */
describe('App fsm getters', () => {
  before(() => {
    cy.visit('app-with-fsm-getters/')
  })

  it('has an add water button', () => {
    cy.get('add-water-button')
      .should('exist')
  })

  it('should display water level', () => {
    cy.get('display-button')
      .should('have.text', 'You have not filled the glass yet, keep going!')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('add-water-button mosaic-button').click()
      })

      it('should display water level', () => {
        cy.get('display-button')
          .should('have.text', expecting)
      })
    })
  }

  [
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'You have not filled the glass yet, keep going!',
    'The glass is full!',
    'The glass is full!'
  ].forEach(e => incrementing(e))
})
