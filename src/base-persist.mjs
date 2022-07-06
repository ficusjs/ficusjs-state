class BasePersist {
  /**
   * Create an instance of persistence with the unique namespace identifier
   * @param {string} namespace
   * @param {object} storage
   * @param {object} options
   */
  constructor (namespace, storage, options = {}) {
    this.namespace = namespace
    this.storage = storage
    this.options = options
    this._init()
  }

  /**
   * Private method for initializing
   * @private
   */
  _init () {
    if ('performance' in globalThis && this.options.clearOnReload) {
      // @ts-ignore
      const entries = globalThis.performance.getEntriesByType('navigation').map(e => e.type)
      const lastUpdated = this.lastUpdated()
      if (lastUpdated && entries.includes('reload')) {
        this.removeState()
      }
    }
  }

  /**
   * Set state in the persistence store
   * @param {*} state
   */
  setState (state) {
    if (state) {
      this.storage.setItem(`${this.namespace}:state`, this._normalizeState(state))
      this.storage.setItem(`${this.namespace}:lastUpdated`, new Date().getTime().toString())
    } else {
      this.removeState()
    }
  }

  /**
   * Normalize state before persisting
   * @param state
   * @returns {string}
   * @private
   */
  _normalizeState (state) {
    if (typeof state === 'object' && (this.options.saveState && typeof this.options.saveState === 'function')) {
      return JSON.stringify(this.options.saveState(state))
    } else if (typeof state !== 'string') {
      return JSON.stringify(state)
    }
    return state
  }

  /**
   * Get state from the persistence store
   * @returns {*}
   */
  getState () {
    const state = this.storage.getItem(`${this.namespace}:state`)
    return state ? JSON.parse(state) : undefined
  }

  /**
   * Get the last updated time in milliseconds since the Unix Epoch
   * @returns {number}
   */
  lastUpdated () {
    const lastUpdated = this.storage.getItem(`${this.namespace}:lastUpdated`)
    return lastUpdated ? parseInt(lastUpdated, 10) : undefined
  }

  /**
   * Remove state from the persistence store
   */
  removeState () {
    this.storage.removeItem(`${this.namespace}:state`)
    this.storage.removeItem(`${this.namespace}:lastUpdated`)
  }
}

/**
 * Function to create persistence for the store
 * @param {string} namespace
 * @param {string} [storageName]
 * @param {object} [options]
 * @returns {BasePersist}
 */
function createPersist (namespace, storageName = 'session', options) {
  if (storageName === 'local') {
    return new BasePersist(namespace, globalThis.localStorage, options)
  }
  return new BasePersist(namespace, globalThis.sessionStorage, options)
}

export { BasePersist, createPersist }
