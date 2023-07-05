import * as _ from 'lodash'

export function isClassInstance(item: any): boolean {
  // Even if item is an object, it might not have a constructor as in the
  // case when it is a null-prototype object, i.e. created using `Object.create(null)`.
  return _.isObject(item) && item.constructor && item.constructor.name !== 'Object'
}
