import { extend } from '../shared'

let activeEffect: ReactiveEffect

class ReactiveEffect {
  private _fn: any

  private onStop: (() => void) | undefined

  private isActive: boolean = true

  public deps: Array<Set<ReactiveEffect>> = []

  constructor (fn, public scheduler?) {
    this._fn = fn
  }

  run () {
    activeEffect = this

    return this._fn()
  }

  stop () {
    if (!this.isActive) return

    this.isActive = false
    cleanEffectDeps(this)
    this.onStop && this.onStop()
    
  }
}

export function cleanEffectDeps (effect: ReactiveEffect) {
  effect.deps.forEach(dep => {
    dep.delete(effect)
  })
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

  if (!activeEffect) return

  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

export function trigger (target, key) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const deps = depsMap.get(key)

  if (!deps) return

  for (const dep of deps) {
    if (dep.scheduler) {
      dep.scheduler()
    } else {
      dep.run()
    }
  }
}

export function stop (runner) {
  runner.effect.stop()
}

export function effect (fn, options: any = {}) {
  const { scheduler } = options
  const _effect = new ReactiveEffect(fn, scheduler)

  extend(_effect, options)
  
  _effect.run()

  const runner: any = _effect.run.bind(_effect)

  runner.effect = _effect

  return runner
}
