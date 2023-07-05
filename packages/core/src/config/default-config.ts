import { RuntimePiomConfig } from './piom-config'

/**
 * @description
 * The default configuration settings which are used if not explicitly overridden in the bootstrap() call.
 *
 * @docsCategory configuration
 */
export const defaultConfig: RuntimePiomConfig = {
  apiOptions: {
    adminApiPath: 'admin',
    frontApiPath: 'front',
    port: 5000,
    adminCors: {
      origin: true,
      credentials: true,
    },
    frontCors: {
      origin: true,
      credentials: true,
    },
    middleware: [],
    hostname: 'localhost',
    apiPrefix: 'api',
  },
}
