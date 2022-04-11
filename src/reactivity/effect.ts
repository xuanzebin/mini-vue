let activeEffect: ReactiveEffect

class ReactiveEffect {
  private _fn: any

  constructor (fn) {
    this._fn = fn
  }

  run () {
    activeEffect = this

    this._fn()
  } 
}

export function effect (fn) {
  const _effect = new ReactiveEffect(fn)

  _effect.run()

  return _effect
}

let targetMap: Map<any, Map<any, Set<ReactiveEffect>>> = new Map()
export function track (target, key) {
  let depsMap = targetMap.get(target)

  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)    
  }

  let deps = depsMap.get(key)

  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
}

export function trigger (target, key) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const deps = depsMap.get(key)

  if (!deps) return

  for (const dep of deps) {
    dep.run()
  }
}