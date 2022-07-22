import { assign, createMachine, interpret } from 'https://cdn.skypack.dev/xstate'
import { addXStateService, wrapXStateService } from '../../../src/index.mjs'

const definition = {
  context: { amount: 0 },
  id: 'glass',
  initial: 'empty',
  states: {
    empty: {
      on: {
        FILL: {
          actions: 'addWater',
          target: 'filling'
        }
      }
    },
    filling: {
      always: {
        cond: 'glassIsFull',
        target: 'full'
      },
      on: {
        FILL: {
          actions: 'addWater',
          target: 'filling',
          internal: false
        }
      }
    },
    full: {}
  }
}

const options = {
  actions: {
    addWater: assign({
      amount: (context, event) => context.amount + 1
    })
  },
  guards: {
    glassIsFull (context, event) {
      return context.amount >= 10
    }
  }
}

const getters = {
  isGlassFull (context) {
    return context.amount >= 10
  },
  remaining (context) {
    if (context.amount === 10) return 0
    return 10 - context.amount
  }
}

const machine =
/** @xstate-layout N4IgpgJg5mDOIC5RQDYENawHRgLYAcAXATwGIAxASQBlrFR8B7WAS0JcYDt6QAPRALQBGAJwBmLACYRkgKwAOWSPFjZABhEAWADQhigoZM1YRANiGq1pgOwj5ayUKEBfZ7tQZsAMxYoULTigKGjokECZWdi4efgQBUwkxMS1TU01TeUlTWTFdfTjRY3SLMxFDTUMha1d3dEwsHz8AoJ4Itg5uMNjzLHMxbLE1WQzJNTEdPQMxISxisUlrIVlbTVtXNxBORgg4Hg96vCJ8hmZ26K7BedMsNXktBSXNdWy8gydZvqF5NKEKzX+aiB9t5fP5Aq1TlFOqBYvFjKp1PJ5JosmlTJJXgUHB8LMNVNZNGU1NUNsCGgBXPwQyIdGKIOTGOzfcwiax3MaY4TYuZDVJieTJRaA4HUs7QviXdQ3O5PeSPZ6yTlZaw4sTWJIiIbLETrZxAA */
createMachine(definition, options)

const service = interpret(machine)

addXStateService('mock.xstate.full.water', wrapXStateService(service, getters, 'mock.xstate.full.water'))
