import { Injectable } from '@nestjs/common'

import { getConfig } from './config-helper'
import { ApiOptions, PiomConfig, RuntimePiomConfig } from './piom-config'

@Injectable()
export class ConfigService implements PiomConfig {
  private activeConfig: RuntimePiomConfig

  constructor() {
    this.activeConfig = getConfig()
  }

  get apiOptions(): Required<ApiOptions> {
    return this.activeConfig.apiOptions
  }
}
