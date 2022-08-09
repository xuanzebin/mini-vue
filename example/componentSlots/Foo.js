import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'

export default {
  render () {
    const btn = h('button', {
      onClick: this.emitAdd
    }, 'addFoo')
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age: 18 }),
      btn,
      renderSlots(this.$slots, 'footer'),
    ])
  },
  setup (props, { emit }) {
    console.log(props)

    const emitAdd = () => {
      emit('foo')
      emit('foo-two', 1, 2)
    }

    return { emitAdd }
  }
}