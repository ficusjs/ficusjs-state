import { assign, createMachine, interpret as interpretXState } from './lib/xstate-fsm.mjs'
import { wrapXStateService, XStateServiceStatus } from './util/wrap-xstate-service.mjs'

function createGetters (service, getters) {
  service._getterCache = {}
  service.getters = new Proxy(getters, {
    get (getters, key) {
      if (!service._getterCache[key]) {
        const result = getters[key](service._xstateService.state.context)
        service._getterCache[key] = result
      }
      return service._getterCache[key]
    }
  })
  service.subscribe(() => {
    service._getterCache = {}
  })
  return service
}

function interpret (machine, getters) {
  const service = wrapXStateService(interpretXState(machine))
  if (getters) {
    return createGetters(service, getters)
  }
  return service
}

function createXStateService (key, machine, getters) {
  const service = interpret(machine, getters)
  globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
  globalThis.__ficusjs__.xstate = globalThis.__ficusjs__.xstate || {}
  globalThis.__ficusjs__.xstate[key] = service
  return service
}

function addXStateService (key, service) {
  globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
  globalThis.__ficusjs__.xstate = globalThis.__ficusjs__.xstate || {}
  globalThis.__ficusjs__.xstate[key] = service
  return service
}

function getXStateService (key) {
  if (globalThis.__ficusjs__ && globalThis.__ficusjs__.xstate && globalThis.__ficusjs__.xstate[key]) {
    return globalThis.__ficusjs__.xstate[key]
  }
}

export {
  XStateServiceStatus,
  addXStateService,
  assign,
  createMachine,
  createXStateService,
  getXStateService,
  interpret,
  wrapXStateService
}
