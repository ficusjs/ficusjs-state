import { html, createCustomElement, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

createCustomElement('increment-button',
  withWorkerStore(worker, {
    increment () {
      this.store.dispatch('increment', this.state.count + 1)
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>Increment</button>`
    }
  })
)
