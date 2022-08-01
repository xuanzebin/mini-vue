import { extend } from '../shared'

let activeEffect: ReactiveEffect
let shouldTrack: boolean = false

export class ReactiveEffect {
  private _fn: any

  private onStop: (() => void) | undefined

  private isActive: boolean = true

  public deps: Array<Set<ReactiveEffect>> = []

  constructor (fn, public scheduler?) {
    this._fn = fn
  }

  run () {
    if (!this.isActive) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const res = this._fn()

    shouldTrack = false

    return res
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

  effect.deps.length = 0
}

export function isTracking () {
  return shouldTrack && activeEffect !== undefined
}

let targetMap: Map<any, Map<any, Set<ReactiveEffect>>> = new Map()
export function track (target, key) {
  if (!isTracking()) return

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

  trackEffect(deps)
}

export function trigger (target, key) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const deps = depsMap.get(key)

  if (!deps) return

  triggerEffect(deps)
}

export function trackEffect (deps: Set<ReactiveEffect>) {
  if (deps.has(activeEffect)) return

  // 每个 target 下的 key 都存储着对应的 effect
  deps.add(activeEffect)
  // 告诉当前正在收集依赖的 effect，其需要处理的 deps
  activeEffect.deps.push(deps)
}

export function triggerEffect (deps: Set<ReactiveEffect>) {
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
