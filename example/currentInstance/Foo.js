import { createTextVnode, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js'

export default {
  name: 'Foo',
  render () {
    return createTextVnode('i am foo')
  },
  setup () {
    const instance = getCurrentInstance()
    
    console.log('instance', instance)

    return {}
  }
}