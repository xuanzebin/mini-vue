import { h } from '../lib/guide-mini-vue.esm.js'

export default {
  render () {
    const btn = h('button', {
      onClick: this.emitAdd
    }, 'addFoo')
    return h('div', {}, [btn])
  },
  setup (props, { emit }) {
    console.log(props)

    const emitAdd = () => {
      console.log('emitAdd 触发')
      emit('foo')
      emit('foo-two', 1, 2)
    }

    return { emitAdd }
  }
}