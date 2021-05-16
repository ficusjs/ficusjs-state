import test from 'ava'
import sinon from 'sinon'
import { createPersist } from '../../src/index.mjs'

let persist

test.beforeEach(t => {
  globalThis.localStorage = {
    setItem: sinon.spy(),
    getItem: sinon.spy(),
    removeItem: sinon.spy()
  }
  persist = createPersist('test', 'local')
})

test('set state', t => {
  persist.setState({ test: 'test' })
  t.is(globalThis.localStorage.setItem.callCount, 2)
  t.deepEqual(globalThis.localStorage.setItem.getCall(0).args, ['test:state', JSON.stringify({ test: 'test' })])
  t.is(globalThis.localStorage.setItem.getCall(1).args[0], 'test:lastUpdated')
})

test('set empty state', t => {
  persist.setState()
  t.truthy(globalThis.localStorage.removeItem.called)
  t.is(globalThis.localStorage.removeItem.getCall(0).args[0], 'test:state')
  t.is(globalThis.localStorage.removeItem.getCall(1).args[0], 'test:lastUpdated')
})

test('get state', t => {
  persist.getState()
  t.truthy(globalThis.localStorage.getItem.called)
  t.is(globalThis.localStorage.getItem.getCall(0).args[0], 'test:state')
})

test('get lastUpdated', t => {
  persist.lastUpdated()
  t.truthy(globalThis.localStorage.getItem.called)
  t.is(globalThis.localStorage.getItem.getCall(1).args[0], 'test:lastUpdated')
})
