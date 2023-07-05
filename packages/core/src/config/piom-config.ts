import { Type } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

import { Middleware } from '../common'

export interface ApiOptions {
  /**
   * @description
   * Which port to Piom server should listen on
   * @default 3000
   */
  port?: number

  /**
   * @description
   * Common path for admin API
   * @default 'admin'
   */
  adminApiPath?: string

  /**
   * @description
   * Common path for front API
   * @default 'front'
   */
  frontApiPath?: string

  /**
   * @description
   * Cors config for admin API
   * @default { origin: true, credentials: true }
   */
  adminCors?: boolean | CorsOptions

  /**
   * @description
   * Cors config for front API
   * @default { origin: true, credentials: true }
   */
  frontCors?: boolean | CorsOptions

  /**
   * @description
   * Custom Express or NestJS middleware for the server.
   *
   * @default []
   */
  middleware?: Middleware[]

  /**
   * @description
   * Set the hostname of the server. If not set, the server will be available on localhost.
   *
   * @default 'localhost'
   */
  hostname?: string

  apiPrefix?: string
}

export interface PiomConfig {
  apiOptions: ApiOptions
}

type DeepPartialSimple<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartialSimple<U>>
        : T[P] extends ReadonlyArray<infer X>
        ? ReadonlyArray<DeepPartialSimple<X>>
        : T[P] extends Type<any>
        ? T[P]
        : DeepPartialSimple<T[P]>)
}

export type PartialPiomConfig = DeepPartialSimple<PiomConfig>

export type RuntimePiomConfig = Required<PiomConfig> & {
  apiOptions: Required<ApiOptions>
}
