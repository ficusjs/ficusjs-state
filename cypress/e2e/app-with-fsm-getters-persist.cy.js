/* global describe cy before it  */
describe('App fsm getters persist', () => {
  before(() => {
    cy.visit('app-with-fsm-getters-persist')
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
    'You have not filled the glass yet, keep going! (there are 6 fills to go!)'
  ].forEach(e => filling(e))

  describe('reload for persistence', () => {
    before(() => {
      cy.reload()
    })

    it('set the initial state to the last persisted state', () => {
      cy.get('display-button')
        .should('have.text', 'You have not filled the glass yet, keep going! (there are 6 fills to go!)')
    })
  })
})
