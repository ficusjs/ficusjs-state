import { html, createCustomElement } from '../util/component.mjs'

import './add-water-button.mjs'
import './display-button.mjs'

createCustomElement('mock-app-with-fsm', {
  render () {
    return html`
      <div>
        <add-water-button></add-water-button>
        <display-button></display-button>
      </div>
    `
  }
})
