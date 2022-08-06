import { createVNode } from './vnode'

export function createApp (rootComponent) {
  return {
    mount (rootContainer) {
      const vnode = createVNode(rootComponent)
    }
  }
}

