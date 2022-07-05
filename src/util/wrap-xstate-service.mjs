export function wrapXStateService (service) {
  return {
    _xstateService: service,
    get status () {
      if (!this._xstateService) return XStateServiceStatus.INIT
      return this._xstateService.status
    },
    get state () {
      return this._xstateService.state
    },
    subscribe (callback) {
      return this._xstateService.subscribe(callback)
    },
    send (action) {
      this._xstateService.send(action)
    },
    start () {
      this._xstateService.start()
    }
  }
}

export const XStateServiceStatus = Object.freeze({
  INIT: -1,
  NOT_STARTED: 0,
  RUNNING: 1,
  STOPPED: 2
})
