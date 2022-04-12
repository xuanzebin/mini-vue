import { mutableHandler, readonlyHandler } from './baseHandler'

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

export function isReactivity (value) {
  return !!value[ReactivityFlags.IS_REACTIVITY]
}

export function isReadonly (value) {
  return !!value[ReactivityFlags.IS_READONLY]
}

function createReactivityObject (raw, handler) {
  return new Proxy(raw, handler)
}