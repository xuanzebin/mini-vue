import { effect } from '../effect'
import { reactivity } from '../reactivity'

describe('effect', () => {
  it('happy path', () => {
    const res = reactivity({ foo: 1 })

    let user
    effect(() => user = res.foo)

    expect(user).toBe(1)
    
    res.foo++

    expect(user).toBe(2)
  });
});