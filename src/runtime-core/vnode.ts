import { isObject } from "../shared"
import { ShapeFlags } from "../shared/ShapeFlags"

export function createVNode (type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeflag: getShapeFlag(type)
  }

  if (typeof children === 'string') {
    vnode.shapeflag = vnode.shapeflag! | ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeflag = vnode.shapeflag! | ShapeFlags.ARRAY_CHILDREN
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