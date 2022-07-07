/* global describe cy before it  */
describe('App fsm', () => {
  before(() => {
    cy.visit('app-with-fsm/')
  })

  it('has an add water button', () => {
    cy.get('add-water-button')
      .should('exist')
  })

  it('should display water level', () => {
    cy.get('display-button')
      .should('have.text', 'You have filled 0 times!')
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
    'You have filled 1 times!',
    'You have filled 2 times!',
    'You have filled 3 times!',
    'You have filled 4 times!',
    'You have filled 5 times!',
    'You have filled 6 times!',
    'You have filled 7 times!',
    'You have filled 8 times!',
    'You have filled 9 times!',
    'The glass is full!',
    'The glass is full!'
  ].forEach(e => incrementing(e))
})
