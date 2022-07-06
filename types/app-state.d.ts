import { AppStateStoreClass, AppStateStoreOptions } from './store'

export interface AppStateStoreOfStores<TS, TP> {
  [key: string]: AppStateStoreClass<TS, TP>
}

export type AppStateStore<TS, TP> = AppStateStoreOfStores<TS, TP> | AppStateStoreClass<TS, TP>

export declare function createAppState<TS, TP> (key: string, options: AppStateStoreOptions<TS>): AppStateStoreClass<TS, TP>

export declare function getAppState<TS, TP> (key: string): AppStateStoreClass<TS, TP>
