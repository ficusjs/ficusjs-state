import { assign, createMachine, interpret as interpretXState } from './lib/xstate-fsm.mjs'
import { wrapXStateService, XStateServiceStatus } from './util/wrap-xstate-service.mjs'

function interpret (machine, getters, persist) {
  const service = wrapXStateService(interpretXState(machine), getters, persist)
  return service
}

function createXStateService (key, machine, getters, persist) {
  const service = interpret(machine, getters, persist)
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
