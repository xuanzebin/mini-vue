import { isProxy, isReactivity, reactivity } from "../reactivity";

describe('reactivity', () => {
  it('happy path', () => {
    const obj = { foo: 1 }
    const res = reactivity(obj)
    
    expect(res).not.toBe(obj)
    expect(res.foo).toBe(1)
    expect(isProxy(res)).toBe(true)
    expect(isReactivity(res)).toBe(true)
    expect(isReactivity(obj)).toBe(false)
  })


  it('nested reactivity effect', () => {
    const obj = { foo: 1, array: [{ baz: 0 }] }
    const res = reactivity(obj)
    
    expect(res).not.toBe(obj)
    expect(res.foo).toBe(1)
    expect(isReactivity(res)).toBe(true)
    expect(isReactivity(obj)).toBe(false)
    expect(isReactivity(res.array)).toBe(true)
    expect(isReactivity(obj.array)).toBe(false)
  })
})