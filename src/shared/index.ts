export const extend = Object.assign

export const isObject = (obj: any) => {
  return obj !== null && typeof obj === 'object'
}

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal)
}

export const isOn = (key: string) => {
  return /^on[A-Z]/.test(key)
}

export const getEventName = (name: string) => {
  return name.slice(2).toLowerCase()
}

export const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key)