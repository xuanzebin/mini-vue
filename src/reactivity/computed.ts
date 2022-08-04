import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  private _value: any

  private _dirty = false

  private _effect: ReactiveEffect

  constructor (getter: any) {
    this._effect = new ReactiveEffect(getter, () => {
      if (this._dirty) {
        this._dirty = false
      }
    })
  }

  get value () {
    if (!this._dirty) {
      this._dirty = true
      this._value = this._effect.run()
    }

    return this._value
  }
}

export default (getter) => {
  return new ComputedRefImpl(getter)
}