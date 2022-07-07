import { Persist } from './persist'

export type AppStateStoreAction = (payload?: any) => void

export interface AppStateStoreBaseOptions<TState extends object> {
  initialState?: TState
  persist?: string | Persist<TState>
  ttl?: number
}

export type AppStateStoreOptions<TState extends object> = AppStateStoreBaseOptions<TState> & {
  [key: string]: AppStateStoreAction
}

export type AppStateGetStateFunc<TState extends object> = (state: TState) => Partial<TState>

export declare class AppStateStoreClass<TState extends object> {
  constructor(options: AppStateStoreOptions<TState>)
  setState (setter: (state: TState) => Partial<TState>, callback?: () => void): void
  getState (key: string | AppStateGetStateFunc<TState>): Partial<TState>
  subscribe (callback: () => any): void
  clear (notifySubscribers?: boolean): void
}
