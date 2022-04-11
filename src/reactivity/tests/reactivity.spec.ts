import { reactivity } from "../reactivity";

describe('reactivity', () => {
  it('happy path', () => {
    const obj = { foo: 1 }
    const res = reactivity(obj)
    
    expect(res).not.toBe(obj)
    expect(res.foo).toBe(1)
  })
})