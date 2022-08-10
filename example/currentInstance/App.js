import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js'
import Foo from './Foo.js'

export const App = {
  name: 'App',
  render () {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      } ,
      [
        h(Foo, {
            count: 1,
        }),
      ]
    )
  },
  setup () {
    const instance = getCurrentInstance()
    
    console.log('instance', instance)

    return {}
  }
}