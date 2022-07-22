import { createPersist } from '../base-persist.mjs'

export function wrapXStateService (service, getters, persist) {
  const wrappedService = {
    _xstateService: service,
    _getterCache: {},
    _persist: typeof persist === 'string' ? createPersist(persist) : persist,
    get status () {
      if (!this._xstateService) return XStateServiceStatus.INIT
      return this._xstateService.status
    },
    get state () {
      return this._xstateService.state
    },
    subscribe (callback) {
      return this._xstateService.subscribe(() => {
        this._getterCache = {}
        if (this._persist && this._xstateService.status === XStateServiceStatus.RUNNING) {
          this._persist.setState(this._xstateService.state)
        }
        callback()
      })
    },
    send (action) {
      this._xstateService.send(action)
    },
    start () {
      this._xstateService.start(this._persist ? this._persist.getState() : undefined)
    }
  }
  if (getters) {
    wrappedService.getters = new Proxy(getters, {
      get (getters, key) {
        if (!wrappedService._getterCache[key]) {
          const result = getters[key](wrappedService._xstateService.state.context)
          wrappedService._getterCache[key] = result
        }
        return wrappedService._getterCache[key]
      }
    })
  }
  return wrappedService
}

export const XStateServiceStatus = Object.freeze({
  INIT: -1,
  NOT_STARTED: 0,
  RUNNING: 1,
  STOPPED: 2
})
