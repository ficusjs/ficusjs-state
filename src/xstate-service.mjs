import { assign, createMachine, interpret as interpretXState } from '@xstate/fsm/es'

function createGetters (service, getters) {
  service._getterCache = {}
  service.getters = new Proxy(getters, {
    get (getters, key) {
      // check the getter cache first
      if (!service._getterCache[key]) {
        const result = getters[key](service._xstateService.state.context)
        service._getterCache[key] = result
      }
      return service._getterCache[key]
    }
  })
  return service
}

function interpret (machine, getters) {
  const service = { _xstateService: interpretXState(machine) }
  if (getters) {
    return createGetters(service, getters)
  }
  return service
}

function createXStateService (definition, options, getters) {
  // xstate-ignore-next-line
  const machine = createMachine(definition, options)
  return interpret(machine, getters)
}

export { assign, createMachine, createXStateService, interpret }
