import test from 'ava'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withXStateService } from '../../src/index.mjs'
import sinon from 'sinon'

test.beforeEach(t => {
  t.context = createWrapper(
    withXStateService({
      status: 0,
      _xstateService: {
        status: 0,
        state: 'test'
      },
      state: 'test',
      subscribe: sinon.stub().returns(sinon.spy()),
      start: sinon.spy(),
      send: sinon.spy()
    }, {
      mounted: sinon.spy(),
      updated: sinon.spy(),
      removed: sinon.spy()
    })
  )
})

test('set-up subscription and start service', t => {
  t.truthy(t.context.fsm.subscribe.called)
  t.truthy(t.context.fsm.start.called)
})

test('send action', t => {
  t.context.fsm.send('LOADING')
  t.truthy(t.context.fsm.send.called)
  t.is(t.context.fsm.send.getCall(0).args[0], 'LOADING')
})

test('stop and start service with mounted', t => {
  t.context.fsm.status = 1
  t.context.removed()
  t.context.fsm.status = 0
  t.context.mounted()
  t.truthy(t.context.fsm.start.called)
})

test('stop and start service with updated', t => {
  t.context.fsm.status = 1
  t.context.removed()
  t.context.fsm.status = 0
  t.context.updated()
  t.truthy(t.context.fsm.start.called)
})

test('start service with updated if already running', t => {
  t.context.fsm.status = 0
  t.context.updated()
  t.truthy(t.context.fsm.start.called)
})

test('state changes', t => {
  let subscribeCallback
  const wrapper = createWrapper(
    withXStateService({
      _xstateService: {
        status: 1,
        state: 'test',
      },
      status: 1,
      state: 'test',
      subscribe (callback) {
        subscribeCallback = callback
        return () => {}
      },
      start () {},
      send () {}
    }, {})
  )
  wrapper._processRender = sinon.spy()
  t.truthy(typeof subscribeCallback === 'function')
  subscribeCallback({ test: 'test' })
  t.truthy(wrapper._processRender.called)
})
