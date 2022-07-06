import { StateMachine } from '@xstate/fsm'

export interface XStateEvent {
  type: string
}

export enum XStateServiceStatus {
  INIT = -1,
  NOT_STARTED = 0,
  RUNNING = 1,
  STOPPED = 2
}

export interface XStateService {
  status: XStateServiceStatus
  state: StateMachine.State
  subscribe (callback: () => void): () => void
  send (event: StateMachine.Action): void
  start (): void
}

export type XStateGetter<TContext> = (context: TContext) => Partial<TContext>

export interface XStateGetterTree<TContext> {
  [key: string]: XStateGetter<TContext>
}

export declare function createXStateService<TContext> (key: string, machine: StateMachine.Machine, getters?: XStateGetterTree<TContext>): XStateService

export declare function getXStateService (key: string): XStateService
