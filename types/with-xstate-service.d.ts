import { StateMachine, EventObject, Typestate } from '@xstate/fsm'
import { CustomElementOptions } from '@ficusjs/core'
import { XStateService } from './xstate-service'

export interface FicusComponentWithXStateService<TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> extends HTMLElement {
  fsm: XStateService<TContext, TEvent, TState>
}

export declare function withXStateService<TCO, TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> (service: XStateService<TContext, TEvent, TState>, options: CustomElementOptions<TCO>)
