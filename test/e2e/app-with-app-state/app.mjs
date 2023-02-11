import { html, createCustomElement, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

createCustomElement('mock-app-with-store',
  withStore(store, {
    mounted () {
      this.lifecycleTracker = this.lifecycleTracker || []
      this.lifecycleTracker.push({ name: 'mounted', timeStamp: Date.now() })
    },
    created () {
      this.lifecycleTracker = this.lifecycleTracker || []
      this.lifecycleTracker.push({ name: 'created', timeStamp: Date.now() })
    },
    render () {
      return html`<div>
    <increment-button></increment-button>
    <clear-button></clear-button>
    <display-button></display-button>
      </div>`
    }
  })
)
