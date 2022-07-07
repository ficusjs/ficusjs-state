import { AppStateStoreClass, AppStateStoreOptions } from './store'

export interface AppStateStoreOfStores<TState extends object> {
  [key: string]: AppStateStoreClass<TState>
}

export type AppStateStore<TState extends object> = AppStateStoreOfStores<TState> | AppStateStoreClass<TState>

export declare function createAppState<TState extends object> (key: string, options: AppStateStoreOptions<TState>): AppStateStoreClass<TState>

export declare function getAppState<TState extends object> (key: string): AppStateStoreClass<TState>
