import { html, createComponentWithXStateService, getXStateService } from '../util/component.mjs'

createComponentWithXStateService(
  'display-button',
  getXStateService('mock.fsm.water'),
  {
    computed: {
      amount () {
        return this.fsm.state.context.amount
      }
    },
    render () {
      return this.amount >= 10 ? html`<span>The glass is full!</span>` : html`<span>You have filled ${this.amount} times!</span>`
    }
  }
)
