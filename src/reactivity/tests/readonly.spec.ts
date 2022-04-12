import { isReadonly, readonly } from "../reactivity";

describe('readonly', () => {
  it('happy path', () => {
    const obj = { foo: 1 }
    const res =  readonly(obj)
    
    expect(res).not.toBe(obj)
    expect(res.foo).toBe(1)
    expect(isReadonly(res)).toBe(true)
    expect(isReadonly(obj)).toBe(false)
  });

  it('should call console.warn when readonly set', () => {
    console.warn = jest.fn()
    const obj = { foo: 1 }
    const res =  readonly(obj)
    
    res.foo = 2
    expect(console.warn).toHaveBeenCalled()
  });
});