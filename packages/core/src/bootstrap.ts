import { NestFactory } from '@nestjs/core'

import { getConfig, PiomConfig, RuntimePiomConfig, setConfig } from './config'

export async function bootstrap(userConfig: Partial<PiomConfig> = {}) {
  // load config
  const config = await sanitizeBootstrapConfig(userConfig)

  // logger parts

  // dynamic load app module
  const appModule = await import('./app.module')

  const { middleware, port, hostname } = config.apiOptions
  const app = await NestFactory.create(appModule.AppModule)

  // apply all early middlewares
  const earlyMiddlewares = middleware.filter((mid) => mid.beforeListen)
  earlyMiddlewares.forEach((mid) => {
    app.use(mid.route, mid.handler)
  })

  await app.listen(port, hostname || '')
  app.enableShutdownHooks()
  logWelcomeMessage(config)
  return app
}

bootstrap({ apiOptions: { port: 8080 } })

/**
 * Setting the global config must be done before loading the AppModule
 */
export async function sanitizeBootstrapConfig(userConfig: Partial<PiomConfig>): Promise<Readonly<RuntimePiomConfig>> {
  // set config
  if (userConfig) {
    await setConfig(userConfig)
  }

  // get the full config
  const config = getConfig()

  return config
}

export function logWelcomeMessage(config: RuntimePiomConfig) {
  // TODO: logging all bootstraping messages here (when have logger configured)
}
