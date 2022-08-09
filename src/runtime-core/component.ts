import emit from './componentEmit'
import { initSlots } from './componentSlots'
import { initProps } from './componentProps'
import { shallowReadonly } from '../reactivity/reactivity'
import { PublicInstanceProxyHandlers } from './componentPublicProxyHandlers'

export function createComponentInstance (vnode) {
  const componentInstance = {
    vnode,
    type: vnode.type,
    setupState: {},
    slots: {},
    emit: () => {}
  }

  componentInstance.emit = emit.bind(null, componentInstance) as any

  return componentInstance
}

export function setupComponent (instance) {
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)

  setupStatefulComponent (instance)
}

export function setupStatefulComponent (instance) {
  const Component = instance.type
  const { setup } = Component

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    })

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