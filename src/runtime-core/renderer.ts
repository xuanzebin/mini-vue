import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render (vnode, container) {
  patch(vnode, container)
}

function patch (vnode, container) {
  const { type } = vnode
  if (typeof type === 'string') {
    // 处理元素
    processElement(vnode, container)
  } else if (isObject(type)) {
    // 处理组件
    processComponent(vnode, container)
  }
}

function processComponent (vnode, container) {
  mountComponent(vnode, container)
}

function processElement (vnode, container) {
  mountElement(vnode, container)
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

function mountElement (vnode, container) {
  const { type, props, children } = vnode
  const el: HTMLElement = document.createElement(type)

  for (let key in props) {
    const value = props[key]

    el.setAttribute(key, value)
  }

  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren (vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}
