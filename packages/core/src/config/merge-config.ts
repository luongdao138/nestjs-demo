import { isClassInstance } from '@piom/common'
import * as _ from 'lodash'

import { PartialPiomConfig, PiomConfig } from './piom-config'

export function mergeConfig<T extends PiomConfig>(target: T, source: PartialPiomConfig, depth = 0): T {
  if (!source) {
    return target
  }

  if (depth === 0) {
    target = _.cloneDeep(target)
  }

  if (_.isObject(target) && _.isObject(source)) {
    for (const key in source) {
      if (_.isObject((source as any)[key])) {
        if (!(target as any)[key]) {
          Object.assign(target as any, { [key]: {} })
        }
        if (!isClassInstance((source as any)[key])) {
          mergeConfig((target as any)[key], (source as any)[key], depth + 1)
        } else {
          ;(target as any)[key] = (source as any)[key]
        }
      } else {
        Object.assign(target, { [key]: (source as any)[key] })
      }
    }
  }

  return target
}
