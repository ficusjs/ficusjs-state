import { Persist } from './persist'

export type AppStateStoreAction = (payload?: any) => void

export interface AppStateStoreOfStores<TS, TP> {
  [key: string]: AppStateStoreClass<TS, TP>
}

export interface AppStateStoreBaseOptions<TS> {
  initialState?: TS
  persist?: string | Persist<TS>
  ttl?: number
}

export type AppStateStoreOptions<TS> = AppStateStoreBaseOptions<TS> & {
  [key: string]: AppStateStoreAction
}

export type AppStateStore<TS, TP> = AppStateStoreOfStores<TS, TP> | AppStateStoreClass<TS, TP>

export type AppStateGetStateFunc<TS, TP> = (state: TS) => TP

declare class AppStateStoreClass<TS, TP> {
  constructor(options: AppStateStoreOptions<TS>)
  setState (setter: (state: TS) => any, callback?: () => void): void
  getState (key: string | AppStateGetStateFunc<TS, TP>): TP
  subscribe (callback: () => any): void
  clear (notifySubscribers?: boolean): void
}

export declare function createAppState<TS, TP> (key: string, options: AppStateStoreOptions<TS>): AppStateStoreClass<TS, TP>

export declare function getAppState<TS, TP> (key: string): AppStateStoreClass<TS, TP>
