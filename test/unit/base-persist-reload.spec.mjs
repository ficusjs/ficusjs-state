import test from 'ava'
import sinon from 'sinon'
import { createPersist } from '../../src/index.mjs'

let persist

test.beforeEach(t => {
  const getItem = sinon.stub()
  getItem.withArgs('test:lastUpdated').returns('10')
  globalThis.localStorage = {
    setItem: sinon.spy(),
    removeItem: sinon.spy(),
    getItem
  }
})

test('set state', t => {
  globalThis.performance = {
    getEntriesByType (type) {
      return [
        { type: 'reload' },
        { type: 'navigate' }
      ]
    }
  }
  persist = createPersist('test', 'local', {
    clearOnReload: true
  })
  t.truthy(globalThis.localStorage.getItem.called)
  t.is(globalThis.localStorage.getItem.getCall(0).args[0], 'test:lastUpdated')
  t.truthy(globalThis.localStorage.removeItem.called)
  t.is(globalThis.localStorage.removeItem.getCall(0).args[0], 'test:state')
  t.is(globalThis.localStorage.removeItem.getCall(1).args[0], 'test:lastUpdated')
})
