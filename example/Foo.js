import { h } from '../lib/guide-mini-vue.esm.js'

export default {
  render () {
    return h('div', {}, 'foo: ' + this.count)
  },
  setup (props) {
    console.log(props)
  }
}