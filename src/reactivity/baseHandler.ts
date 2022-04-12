import { track, trigger } from "./effect"
import { ReactivityFlags } from "./reactivity"

function createGetter (isReadonly = false) {
  return function get (target, key) {
    if (key === ReactivityFlags.IS_REACTIVITY) {
      return !isReadonly
    } else if (key === ReactivityFlags.IS_READONLY) {
      return !!isReadonly
    }

    const res = Reflect.get(target, key)

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