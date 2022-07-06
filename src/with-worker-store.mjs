export function withWorkerStore (worker, options) {
  return {
    ...options,
    created () {
      const that = this
      that.worker = worker
      globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
      globalThis.__ficusjs__.workers = globalThis.__ficusjs__.workers || new Map()
      if (!globalThis.__ficusjs__.workers.has(worker)) {
        const elements = new Set()
        elements.add(that)
        globalThis.__ficusjs__.workers.set(worker, elements)
      } else {
        const elements = globalThis.__ficusjs__.workers.get(worker)
        if (!elements.has(that)) {
          elements.add(that)
        }
      }
      if (!worker.onmessage) {
        that.worker.onmessage = e => {
          const elements = globalThis.__ficusjs__.workers.get(worker)
          for (const element of elements) {
            element.state = e.data
            // clear the getter cache
            element.computedCache = {}
            // Run the render processor now that there's changes
            element._processRender.apply(element)
          }
        }
      }
      that.store = {
        dispatch (actionName, payload) {
          that.worker.postMessage({ actionName, payload })
        }
      }
      if (options.created) options.created.call(that)
    }
  }
}
