import { h } from '../../lib/guide-mini-vue.esm.js'
import Foo from './Foo.js'

export const App = {
  render () {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      } ,
      // 'hi, ' + this.msg
      [
        h('p', { class: 'red' }, 'hi'),
        h('p', { class: 'blue' }, 'mini-vue'),
        h(Foo, {
            count: 1,
        }, {
          header: ({ age }) => h('p', {}, 'header' + age),
          footer: () => h('p', {}, 'footer')
        }),
      ]
    )
  },
  setup () {
    return {
      msg: 'mini-vue'
    }
  }
}