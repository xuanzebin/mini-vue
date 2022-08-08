import { camelize, toHandleKey } from '../shared'

export default (instance, event, ...args) => {
  const { props } = instance

  const eventName = toHandleKey(camelize(event))
  const eventFunction = props[eventName]

  eventFunction && eventFunction(...args)
}