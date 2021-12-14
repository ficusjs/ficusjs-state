export declare class BasePersist<T, P> {
  constructor(namespace: string, storage: Window['sessionStorage'] | Window['localStorage'], options?: PersistOptions<P>)
  setState (state: T): void
  getState (): T
  removeState (): void
}

export declare function createPersist<T>(namespace: string, storage: 'local' | 'session', options?: PersistOptions<T>): void

export interface PersistOptions<T> {
  clearOnReload: boolean
  saveState: (state) => T
}

export interface Persist<TS> {
  constructor(namespace: string)
  setState (state: TS): void
  getState (): TS
  removeState (): void
}
