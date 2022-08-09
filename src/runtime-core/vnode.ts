import { isObject } from "../shared"
import { ShapeFlags, defaultShapeFlags } from "../shared/ShapeFlags"

export function createVNode (type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeflag: getShapeFlag(type) || defaultShapeFlags
  }

  if (typeof children === 'string') {
    vnode.shapeflag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeflag |= ShapeFlags.ARRAY_CHILDREN
  }

  if (vnode.shapeflag & ShapeFlags.STATEFUL_COMPONENT) {
    if (isObject(vnode.children)) {
      vnode.shapeflag |= ShapeFlags.SLOTS_CHILDREN
    }
  }

  return vnode
}

function getShapeFlag (type) {
  if (typeof type === 'string') {
    return ShapeFlags.ELEMENT
  } else if (isObject(type)) {
    return ShapeFlags.STATEFUL_COMPONENT
  }
}