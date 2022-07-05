import { createMachine, createXStateService } from '../../../src/index.mjs'

const machine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAooqAA6qx7moCnEAA9EARgAcAThzSA7ADYArMukBmceLWL1AGhABPCeslzpF6coAs15ePXy1AX2cG0GbDlLkqdJqwcSCA8fAJCwWIIUrIKKmqa2tK6BsYI0uI4AAw5WeLW4gBMOfLqtq5uIASoEHDCHli4hD6UYMKh-HiCwlHWhamI0oU46qNj1llD1vLyru7ojd5kre28nd2RiOpZijiFfeKKKtO6hdID6dY4kmPKhabykgU7cyAN2KthXRGgUVIX4nk5ksINB6gqziAA */
createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active'
        }
      }
    },
    active: {
      on: {
        TOGGLE: {
          target: 'inactive'
        }
      }
    }
  }
})

createXStateService('mock.state.chart', machine)
