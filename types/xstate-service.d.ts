import { StateMachine, EventObject, Typestate } from '@xstate/fsm'

export interface XStateEvent {
  type: string
}

export enum XStateServiceStatus {
  INIT = -1,
  NOT_STARTED = 0,
  RUNNING = 1,
  STOPPED = 2
}

export interface XStateService<TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> {
  status: XStateServiceStatus
  state: StateMachine.State<TContext, TEvent, TState>
  subscribe (callback: () => void): () => void
  send (event: StateMachine.Action<TContext, TEvent>): void
  start (): void
}

export type XStateGetter<TContext extends object> = (context: TContext) => Partial<TContext>

export interface XStateGetterTree<TContext extends object> {
  [key: string]: XStateGetter<TContext>
}

export declare function addXStateService<TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> (key: string, service: XStateService<TContext, TEvent, TState>): XStateService<TContext, TEvent, TState>

export declare function createXStateService<TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> (key: string, machine: StateMachine.Machine<TContext, TEvent, TState>, getters?: XStateGetterTree<TContext>): XStateService<TContext, TEvent, TState>

export declare function getXStateService<TContext extends object, TEvent extends EventObject, TState extends Typestate<TContext>> (key: string): XStateService<TContext, TEvent, TState>
