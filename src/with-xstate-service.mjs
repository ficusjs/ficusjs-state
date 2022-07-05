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
      this._setupService(service)
      if (options.created) options.created.call(this)
    },
    send (action) {
      this.fsmService.send(action)
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
    _wrapXStateService () {
      return { _xstateService: service }
    },
    _setupService (service) {
      service = service._xstateService ? service : this._wrapXStateService(service)
      this.fsmService = service
      if (service && service._xstateService && service._xstateService.subscribe && typeof service._xstateService.subscribe === 'function') {
        const fsm = {
          state: undefined
        }
        if (service.getters) {
          fsm.getters = service.getters
        }
        this.fsmSubscriptionCallback = state => {
          this.fsm.state = state
          this._subscribeCallback()
        }
        this.fsm = fsm
        this.send = action => this.fsmService._xstateService.send(action)
        this._subscribeToFsmService()
      }
    },
    _startFsmService () {
      if (this.fsmService && this.fsmService._xstateService && this.fsmSubscription && this.fsmService._xstateService.status === 0) {
        this.fsmService._xstateService.start()
      }
    },
    _subscribeToFsmService (invokeSubscribeCallback = true) {
      if (this.fsmService && this.fsmService._xstateService && this.fsmService._xstateService.subscribe && typeof this.fsmService._xstateService.subscribe === 'function' && !this.fsmSubscription) {
        this.fsmSubscription = this.fsmService._xstateService.subscribe(this.fsmSubscriptionCallback)
        if (invokeSubscribeCallback) this.fsmSubscriptionCallback()
        this._startFsmService()
      }
    },
    _unsubscribeFromFsmService () {
      if (this.fsmService && this.fsmService._xstateService && this.fsmSubscription && typeof this.fsmSubscription === 'function') {
        this.fsmSubscription()
        this.fsmSubscription = null
      }
    }
  }
}
