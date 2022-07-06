import test from 'ava'
import sinon from 'sinon'
import { createWrapper } from '../helpers/wrapper.mjs'
import { withWorkerStore } from '../../src/index.mjs'

test('starting a worker store', t => {
  const postMessageSpy = sinon.spy()
  const wrapper = createWrapper(
    withWorkerStore({
      postMessage () {
        postMessageSpy(arguments)
        wrapper.worker.onmessage({
          data: undefined
        })
      }
    }, {
      mounted () {
        this.store.dispatch('start')
      }
    })
  )
  wrapper._processRender = sinon.spy()
  wrapper.mounted()
  t.truthy(postMessageSpy.called)
  t.deepEqual(postMessageSpy.getCall(0).args[0], [{ actionName: 'start', payload: undefined }])
  t.truthy(wrapper._processRender.called)
})

test('dispatch method', t => {
  const postMessage = sinon.spy()
  const wrapper = createWrapper(
    withWorkerStore({
      postMessage
    }, {
      mounted: sinon.spy()
    })
  )
  const payload = { some: 'data' }
  wrapper.store.dispatch('testAction', payload)
  t.truthy(postMessage.called)
  t.deepEqual(postMessage.getCall(0).args[0], { actionName: 'testAction', payload })
})

test('worker reuse', t => {
  const postMessage = sinon.spy()
  const worker = {
    postMessage
  }
  const wrapper1 = createWrapper(
    withWorkerStore(worker, {
      mounted: sinon.spy()
    })
  )
  const wrapper2 = createWrapper(
    withWorkerStore(worker, {
      mounted: sinon.spy()
    })
  )
  const payload = { some: 'data' }
  wrapper1.store.dispatch('testAction', payload)
  wrapper2.store.dispatch('testAction', payload)
  t.truthy(postMessage.called)
  t.is(postMessage.callCount, 2)
  t.deepEqual(postMessage.getCall(0).args[0], { actionName: 'testAction', payload })
  t.deepEqual(postMessage.getCall(1).args[0], { actionName: 'testAction', payload })
})
