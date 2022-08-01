import ref from '../ref'
import { effect } from '../effect';
import { isProxy } from '../reactivity';

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)

    expect(a.value).toBe(1)
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
});