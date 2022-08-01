import {
  isTracking,
  trackEffect,
  triggerEffect,
  ReactiveEffect,
} from './effect'
import { reactivity } from './reactivity'
import { hasChanged, isObject } from '../shared'

class RefImpl {
  _value: any

  _rawValue: any

  deps: Set<ReactiveEffect> = new Set()

  constructor (value) {
    this._rawValue = value
    this._value = convert(value)
  }

  get value () {
    if (isTracking()) {
      trackEffect(this.deps)
    }

    return this._value
  }

  set value (newValue) {
    if (!hasChanged(this._rawValue, newValue)) return

    this._rawValue = newValue
    this._value = convert(newValue)
    triggerEffect(this.deps)
  }
}

function convert (value) {
  return isObject(value) ? reactivity(value) : value
}

export default (value) => {
  return new RefImpl(value)
}