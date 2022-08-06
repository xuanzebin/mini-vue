import { createComponentInstance, setupComponent } from './component'

export function render (vnode, container) {
  patch(vnode, container)
}

function patch (vnode, container) {
  // 处理组件
  processComponent(vnode, container)
}

function processComponent (vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent (vode, container) {
  const instance = createComponentInstance(vode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect (instance, container) {
  const subtree = instance.render()

  patch(subtree, container)
}

