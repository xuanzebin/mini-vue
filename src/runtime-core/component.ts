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
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    })
    setCurrentInstance(null)

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

let currentInstance = null

export function getCurrentInstance () {
  return currentInstance
}

function setCurrentInstance (instance) {
  currentInstance = instance
}