import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { isRef, reactivity, ReactivityFlags, readonly, unRef } from "./reactivity"

function createGetter (isReadonly = false, isShallow = false) {
  return function get (target, key) {
    if (key === ReactivityFlags.IS_REACTIVITY) {
      return !isReadonly
    } else if (key === ReactivityFlags.IS_READONLY) {
      return !!isReadonly
    }

    let res = Reflect.get(target, key)

    if (isShallow) {
      return res
    }

    if (isObject(res)) {
      res = isReadonly ? readonly(res) : reactivity(res)
    }

    if (!isReadonly) {
      track(target, key)
    }

    return res
  }
}

function createSetter () {
  return function set (target, key, value) {
    const res = Reflect.set(target, key, value)

    trigger(target, key)
    
    return res
  }
}

const mutableGet = createGetter()
const mutableSet = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

export const mutableHandler = {
  get: mutableGet,
  set: mutableSet
}

export const readonlyHandler = {
  get: readonlyGet,
  set: (target, key, value) => {
    console.warn(`key: ${key} 不能被 set，因为 target 是一个 readonly 对象`)
    
    return true
  }
}

export const proxyRefHandler = {
  get: (target, key) => {
    return unRef(Reflect.get(target, key))
  },
  set: (target, key, value) => {
    if (isRef(target[key]) && !isRef(value)) {
      return target[key].value = value
    } else {
      return Reflect.set(target, key, value)
    }
  }
}

export const shallowReadonlyHandler = extend({}, readonlyHandler, {
  get: shallowReadonlyGet
})