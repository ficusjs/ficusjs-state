export declare class BasePersist<TState extends object> {
  constructor(namespace: string, storage: Window['sessionStorage'] | Window['localStorage'], options?: PersistOptions<TState>)
  setState (state: TState): void
  getState (): TState
  removeState (): void
}

export declare function createPersist<TState extends object>(namespace: string, storage: 'local' | 'session', options?: PersistOptions<TState>): Persist<TState>

export interface PersistOptions<TState extends object> {
  clearOnReload: boolean
  saveState: (state) => Partial<TState>
}

export interface Persist<TState extends object> {
  constructor(namespace: string)
  setState (state: TState): void
  getState (): TState
  removeState (): void
}
