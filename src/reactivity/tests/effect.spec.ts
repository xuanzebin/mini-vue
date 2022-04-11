import { effect, stop } from '../effect'
import { reactivity } from '../reactivity'

describe('effect', () => {
  it('happy path', () => {
    const res = reactivity({ foo: 1 })

    let user
    effect(() => user = res.foo + 1)

    expect(user).toBe(2)
    
    res.foo++

    expect(user).toBe(3)
  })

  it('should return runner when call effect', () => {
    let foo = 10
    
    const runner = effect(() => {
      foo++

      return 'foo'
    })

    expect(foo).toBe(11)
    const res = runner()
    expect(foo).toBe(12)
    expect(res).toBe('foo')
  });

  it('scheduler', () => {
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactivity({ foo: 1 })
    const runner = effect(() => {
      dummy = obj.foo
    }, { scheduler })
    
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)

    run()

    expect(dummy).toBe(2)
  });

  it('stop', () => {
    let dummy
    const obj = reactivity({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })

    expect(dummy).toBe(1)
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.prop = 3
    expect(dummy).toBe(2)

    runner()
    expect(dummy).toBe(3)
  });

  it('toStop', () => {
    const obj = reactivity({ foo: 1 })
    const onStop = jest.fn()
    let dummy
    const runner = effect(() => {
      dummy = obj.foo
    }, { onStop })

    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  });
});