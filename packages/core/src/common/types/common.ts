import { Type } from '@nestjs/common'

export type MiddlewareHandler = Type<any> | ((...args: any[]) => any)

export interface Middleware {
  /**
   * @description
   * The Express middleware function or NestJS `NestMiddleware` class
   */
  handler: MiddlewareHandler

  /**
   * @description
   * The route to which this middleware will apply. Pattern based routes are supported as well.
   *
   * The `'ab*cd'` route path will match `abcd`, `ab_cd`, `abecd`, and so on. The characters `?`, `+`, `*`, and `()` may be used in a route path,
   * and are subsets of their regular expression counterparts. The hyphen (`-`) and the dot (`.`) are interpreted literally.
   */
  route: string

  /**
   * @description
   * When set to `true`, this will cause the middleware to be applied before the Piom server (and underlying Express server) starts listening
   * for connections. In practical terms this means that the middleware will be at the very start of the middleware stack, before even the
   * `body-parser` middleware which is automatically applied by NestJS. This can be useful in certain cases such as when you need to access the
   * raw unparsed request for a specific route.
   *
   * @default false
   */
  beforeListen?: boolean
}
