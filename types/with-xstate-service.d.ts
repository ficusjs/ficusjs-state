import { CustomElementOptions } from '@ficusjs/core'
import { XStateService } from './xstate-service'

export interface FicusComponentWithXStateService extends HTMLElement {
  fsm: XStateService
}

export declare function withXStateService<TCO> (service: XStateService, options: CustomElementOptions<TCO>)
