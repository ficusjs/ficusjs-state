import { Persist } from './persist'

export type AppStateStoreAction = (payload?: any) => void

export interface AppStateStoreBaseOptions<TS> {
  initialState?: TS
  persist?: string | Persist<TS>
  ttl?: number
}

export type AppStateStoreOptions<TS> = AppStateStoreBaseOptions<TS> & {
  [key: string]: AppStateStoreAction
}

export type AppStateGetStateFunc<TS, TP> = (state: TS) => TP

export declare class AppStateStoreClass<TS, TP> {
  constructor(options: AppStateStoreOptions<TS>)
  setState (setter: (state: TS) => any, callback?: () => void): void
  getState (key: string | AppStateGetStateFunc<TS, TP>): TP
  subscribe (callback: () => any): void
  clear (notifySubscribers?: boolean): void
}
