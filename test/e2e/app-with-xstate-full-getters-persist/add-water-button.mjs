import { html, createComponentWithXStateService, getXStateService } from '../util/component.mjs'

createComponentWithXStateService(
  'add-water-button',
  getXStateService('mock.xstate.full.water'),
  {
    addWater () {
      this.fsm.send('FILL')
    },
    render () {
      return html`<button type="button" onclick="${this.addWater}">Add water</button>`
    }
  }
)
