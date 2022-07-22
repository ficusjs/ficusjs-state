/* global describe cy before it  */
describe('App XState full getters', () => {
  before(() => {
    cy.visit('app-with-xstate-full-getters')
  })

  it('has an add water button', () => {
    cy.get('add-water-button')
      .should('exist')
  })

  it('should display water level', () => {
    cy.get('display-button')
      .should('have.text', 'You have not filled the glass yet, keep going! (there are 10 fills to go!)')
  })

  function filling (expecting) {
    describe('adding water', () => {
      before(() => {
        cy.get('add-water-button button').click()
      })

      it('should display water level', () => {
        cy.get('display-button')
          .should('have.text', expecting)
      })
    })
  }

  [
    'You have not filled the glass yet, keep going! (there are 9 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 8 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 7 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 6 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 5 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 4 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 3 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 2 fills to go!)',
    'You have not filled the glass yet, keep going! (there are 1 fills to go!)',
    'The glass is full!',
    'The glass is full!'
  ].forEach(e => filling(e))
})
