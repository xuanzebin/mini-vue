import { readonly } from "../reactivity";

describe('readonly', () => {
  it('happy path', () => {
    const obj = { foo: 1 }
    const res =  readonly(obj)
    
    expect(res).not.toBe(obj)
    expect(res.foo).toBe(1)
  });

  it('should warn when readonly set', () => {
    console.warn = jest.fn()
    const obj = { foo: 1 }
    const res =  readonly(obj)
    
    res.foo = 2
    expect(console.warn).toHaveBeenCalled()
  });
});