import ref from '../ref'
import { effect } from '../effect';
import { isProxy, isRef, proxyRefs, unRef } from '../reactivity';

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)

    expect(a.value).toBe(1)
    expect(unRef(a)).toBe(1)
    expect(isRef(a)).toBe(true)
  })

  it('the value is reactivity', () => {
    const a = ref(1)
    let res = 0
    let value = 0
    
    effect(() => {
      res++
      value = a.value
    })

    expect(res).toBe(1)
    expect(value).toBe(1)

    a.value = 2

    expect(res).toBe(2)
    expect(value).toBe(2)
    // the same value change not trigger effect
    a.value = 2

    expect(res).toBe(2)
    expect(value).toBe(2)
  })

  it('the properties is nested reactivity', () => {
    const a = ref({ baz: { bar: 1 } })

    expect(isProxy(a.value)).toBe(true)
    expect(isProxy(a.value.baz)).toBe(true)
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(10),
      name: 'bar'
    }

    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
    expect(proxyUser.name).toBe('bar')

    proxyUser.age = 20
    expect(user.age.value).toBe(20)
    expect(proxyUser.age).toBe(20)

    proxyUser.age = ref(10)
    expect(user.age.value).toBe(10)
    expect(proxyUser.age).toBe(10)
  })
});