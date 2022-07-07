import { html, createComponentWithXStateService, getXStateService } from '../util/component.mjs'

createComponentWithXStateService(
  'display-button',
  getXStateService('mock.fsm.water'),
  {
    render () {
      return this.fsm.getters.isGlassFull ? html`<span>The glass is full!</span>` : html`<span>You have not filled the glass yet, keep going!</span>`
    }
  }
)
