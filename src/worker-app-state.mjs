/* istanbul ignore next */
import { Store } from './store.mjs'

globalThis.ficusjs = globalThis.ficusjs || {}

globalThis.ficusjs.createAppState = globalThis.ficusjs.createAppState || function (options) {
  return new Store(options)
}
