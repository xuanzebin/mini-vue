import {
  mutableHandler,
  proxyRefHandler,
  readonlyHandler,
  shallowReadonlyHandler
} from './baseHandler'

export const enum ReactivityFlags {
  IS_REACTIVITY = '__v_isReactivity',

  IS_READONLY = '__v_isReadonly'
}

export function reactivity (raw) {
  return createReactivityObject(raw, mutableHandler) 
}

export function readonly (raw) {
  return createReactivityObject(raw, readonlyHandler)
}

export function shallowReadonly (raw) {
  return createReactivityObject(raw, shallowReadonlyHandler)
}

export function proxyRefs(raw) {
  return createReactivityObject(raw, proxyRefHandler)
}

export function isReactivity (value) {
  return !!value[ReactivityFlags.IS_REACTIVITY]
}

export function isReadonly (value) {
  return !!value[ReactivityFlags.IS_READONLY]
}

export function isProxy (value) {
  return isReactivity(value) || isReadonly(value)
}

export function isRef (value) {
  return !!value.__v_isRef
}

export function unRef (value) {
  return isRef(value) ? value.value : value
}

function createReactivityObject (raw, handler) {
  return new Proxy(raw, handler)
}
