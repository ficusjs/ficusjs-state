import { CustomElementOptions } from '@ficusjs/core'

export type WithLocalStateComponentOptions<TState extends object, TContent> = CustomElementOptions<TContent> & {
  state: TState
}

export interface FicusComponentWithLocalState<TState extends object> extends HTMLElement {
  state: TState
  setState (setter: (state: TState) => Partial<TState>, callback?: () => void): void
}

export declare function withLocalState<TState extends object, TContent> (options: WithLocalStateComponentOptions<TState, TContent>)
