import { AppStateStore } from './app-state'
import { CustomElementOptions } from '@ficusjs/core'

export interface FicusComponentWithStore<TState extends object> extends HTMLElement {
  store: AppStateStore<TState>
  setStore: (store: AppStateStore<TState>) => void
}

export declare function withStore<TState extends object, TContent> (store: AppStateStore<TState>, options: CustomElementOptions<TContent>)
