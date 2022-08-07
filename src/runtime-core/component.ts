import { shallowReadonly } from '../reactivity/reactivity'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicProxyHandlers'

export function createComponentInstance (vnode) {
  return {
    vnode,
    type: vnode.type,
    setupState: {}
  }
}

export function setupComponent (instance) {
  initProps(instance, instance.vnode.props)
  // initSlots()

  setupStatefulComponent (instance)
}

export function setupStatefulComponent (instance) {
  const Component = instance.type
  const { setup } = Component

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props))

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult (instance, setupResult) {
  // TODO: function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup (instance) {
  const Component = instance.type

  instance.render = Component.render
}