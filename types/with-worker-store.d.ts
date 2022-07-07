import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithWorkerStore<TPayload> extends HTMLElement {
  store: {
    dispatch: (actionName: string, payload: TPayload) => void
  }
}

export declare function withWorkerStore<TContent> (worker: Worker, options: CustomElementOptions<TContent>)
