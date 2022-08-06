export function createComponentInstance (vnode) {
  return {
    vnode,
    type: vnode.type
  }
}

export function setupComponent (instance) {
  // initProps()
  // initSlots()

  setupStatefulComponent (instance)
}

export function setupStatefulComponent (instance) {
  const Component = instance.type
  const { setup } = Component

  if (setup) {
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }

  finishComponentSetup(instance)
}

function handleSetupResult (instance, setupResult) {
  // TODO: function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
}

function finishComponentSetup (instance) {
  const Component = instance.type

  if (Component.render) {
    instance.render = Component.render
  }
}