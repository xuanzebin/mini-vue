import { isObject } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'

export function render (vnode, container) {
  patch(vnode, container)
}

function patch (vnode, container) {
  const { shapeflag } = vnode
  if (shapeflag & ShapeFlags.ELEMENT) {
    // 处理元素
    processElement(vnode, container)
  } else if (shapeflag & ShapeFlags.STATEFUL_COMPONENT) {
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

function mountComponent (initialVNode, container) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect (instance, initialVNode, container) {
  const { proxy, render } = instance
  const subtree = render.call(proxy)

  patch(subtree, container)

  initialVNode.el = subtree.el
}

function mountElement (vnode, container) {
  const { type, props, children, shapeflag } = vnode
  const el: HTMLElement = document.createElement(type)
  
  vnode.el = el

  for (let key in props) {
    const value = props[key]

    el.setAttribute(key, value)
  }

  if (shapeflag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeflag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren (vnode, container) {
  vnode.children.forEach(v => {
    patch(v, container)
  })
}
