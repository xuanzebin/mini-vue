import computed from "../computed";
import { reactivity } from "../reactivity";

describe('computed', () => {
  it('happy path', () => {
    const a = reactivity({
      age: 1
    })
    const user =  computed(() => {
      return a.age
    })

    expect(a.age).toBe(1)
    expect(user.value).toBe(1)
  });

  it('can computed the new getter, and save the value when the getter not change', () => {
    const a = reactivity({
      age: 1
    })
    const getter = jest.fn(() => {
      return a.age
    })
    const user =  computed(getter)
    expect(getter).toBeCalledTimes(0)

    expect(user.value).toBe(1)
    expect(getter).toBeCalledTimes(1)

    user.value;
    expect(user.value).toBe(1)
    expect(getter).toBeCalledTimes(1)

    a.age = 2
    expect(user.value).toBe(2)
    expect(getter).toBeCalledTimes(2)

    user.value;
    expect(user.value).toBe(2)
    expect(getter).toBeCalledTimes(2)
  })
});