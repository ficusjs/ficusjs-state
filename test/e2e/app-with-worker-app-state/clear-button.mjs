import { html, createCustomElement, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

createCustomElement('clear-button',
  withWorkerStore(worker, {
    clear () {
      this.store.dispatch('clear')
    },
    render () {
      return html`<button type="button" onclick=${this.clear}>Clear</button>`
    }
  })
)
