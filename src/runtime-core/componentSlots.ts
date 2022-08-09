import { ShapeFlags } from "../shared/ShapeFlags"

export function initSlots (instance, children) {
  const { vnode } = instance

  const isSlots = vnode.shapeflag & ShapeFlags.SLOTS_CHILDREN

  if (!isSlots) return

  normalizeObjectSlots(children, instance.slots)
}

function normalizeObjectSlots (children, slots) {
  for (let key in children) {
    const value = children[key]

    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}

function normalizeSlotValue (value) {
  return Array.isArray(value) ? value : [value]
}