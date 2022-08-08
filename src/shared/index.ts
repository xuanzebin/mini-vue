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

export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const toHandleKey = (str: string) => `on${capitalize(str)}`

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}