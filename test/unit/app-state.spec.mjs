import test from 'ava'
import sinon from 'sinon'
import { createAppState, getAppState } from '../../src/app-state.mjs'

let store

test.beforeEach(t => {
  store = createAppState('test.store', {
    initialState: {
      test: null,
      nested: {
        prop1: null,
        prop2: null
      },
      test2: null
    }
  })
})

test('create a store', t => {
  t.truthy(store)
})

test('state change using direct assignment', t => {
  store.state.test = 'test'
  t.is(store.state.test, 'test')
})

test('state change nested object using direct assignment', t => {
  const newNested = { prop1: 'test', prop2: 'test2' }
  store.state.nested = newNested
  t.deepEqual(store.state.nested, newNested)
})

test('setState change', t => {
  store.setState(() => ({ test: 'test2' }))
  t.is(store.state.test, 'test2')
})

test('setState change nested object', t => {
  const expected = { prop1: null, prop2: 'test2' }
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
})

test('getState with string', t => {
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.is(store.getState('nested.prop2'), 'test2')
})

test('getState with function', t => {
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  const callback = sinon.spy()
  const getter = function (state) {
    callback()
    return state.nested.prop2
  }
  t.is(store.getState(getter), 'test2')
  t.is(store.getState(getter), 'test2')
  t.is(store.getState(getter), 'test2')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
})

test('getState with function projection', t => {
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  const callback = sinon.spy()
  const expected = {
    prop1: null,
    prop2: 'test2',
    test3: 'test3'
  }
  const getter = function (state) {
    callback()
    return { ...state.nested, test3: 'test3' }
  }
  t.deepEqual(store.getState(getter), expected)
  t.deepEqual(store.getState(getter), expected)
  t.deepEqual(store.getState(getter), expected)
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
})

test('clear the store', t => {
  store.state.test = 'test'
  t.is(store.state.test, 'test')
  store.clear()
  t.is(store.state.test, null)
})

test('subscribe to a store change', t => {
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.state.test = 'test'
  t.is(store.state.test, 'test')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})

test('subscribe to a store change without function', t => {
  const error = t.throws(() => {
    store.subscribe('subscribe')
  })
  t.is(error.message, 'Dude, you can only subscribe to store changes with a valid function')
})

test('store change using direct assignment', t => {
  const expected = { prop1: null, prop2: 'test2' }
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.state.test = 'test2'
  store.state.nested = { prop1: null, prop2: 'test2' }
  store.state.test2 = 'test3'
  t.deepEqual(store.state.test, 'test2')
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
  t.truthy(callback.called)
  t.is(callback.callCount, 3)
  unsub()
})

test('store change using setState', t => {
  const expected = { prop1: null, prop2: 'test2' }
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.setState(() => ({ test: 'test2', nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.deepEqual(store.state.test, 'test2')
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})

test('store action', async t => {
  const store = createAppState('test5.store', {
    initialState: {
      test: null,
      test2: null
    },
    async setTest2 (payload) {
      return new Promise(resolve => setTimeout(() => {
        this.state.test2 = payload
        resolve()
      }))
    }
  })
  await store.setTest2('test5')
  t.is(store.state.test2, 'test5')
})

test('get a store', t => {
  const thisStore = getAppState('test.store')
  t.is(thisStore, store)
})

test('store ttl', t => {
  const store = createAppState('test2.store', {
    ttl: 100,
    initialState: {
      test: null,
      nested: {
        prop1: null,
        prop2: null
      },
      test2: null
    }
  })
  const expected = { prop1: null, prop2: null }
  store.state.nested = { prop1: null, prop2: 'test2' }
  return new Promise(resolve => {
    setTimeout(() => {
      t.deepEqual(store.state.nested, expected)
      resolve()
    }, 200)
  })
})
