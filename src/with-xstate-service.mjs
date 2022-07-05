import { wrapXStateService, XStateServiceStatus } from './util/wrap-xstate-service.mjs'

export function withXStateService (service, options) {
  return {
    ...options,
    created () {
      this._subscribeCallback = () => {
        // clear the computed cache
        this.computedCache = {}

        // Run the render processor now that there's changes
        this._processRender()
      }
      this.setXStateService(service)
      if (options.created) options.created.call(this)
    },
    mounted () {
      this._subscribeToFsmService(false)
      if (options.mounted) options.mounted.call(this)
    },
    updated () {
      this._subscribeToFsmService(false)
      if (options.updated) options.updated.call(this)
    },
    removed () {
      this._unsubscribeFromFsmService()
      if (options.removed) options.removed.call(this)
    },
    setXStateService (service) {
      this.fsm = service && service.status !== XStateServiceStatus.INIT ? service : wrapXStateService(service)
      this._fsmSubscriptionCallback = () => {
        if (this.fsm.status === XStateServiceStatus.RUNNING && this._fsmSubscription) {
          this._subscribeCallback()
        }
      }
      this._subscribeToFsmService()
    },
    _startFsmService () {
      if (this.fsm && this._fsmSubscription && this.fsm.status === XStateServiceStatus.NOT_STARTED) {
        this.fsm.start()
      }
    },
    _subscribeToFsmService (invokeSubscribeCallback = true) {
      if (this.fsm && this.fsm.status !== XStateServiceStatus.INIT && !this._fsmSubscription) {
        this._fsmSubscription = this.fsm.subscribe(this._fsmSubscriptionCallback)
        if (invokeSubscribeCallback) this._fsmSubscriptionCallback()
        this._startFsmService()
      }
    },
    _unsubscribeFromFsmService () {
      if (this.fsm && this.fsm.status !== XStateServiceStatus.INIT && this._fsmSubscription && typeof this._fsmSubscription === 'function') {
        this._fsmSubscription()
        this._fsmSubscription = null
      }
    }
  }
}
