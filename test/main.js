import Vue from 'vue'
import Foo from './home/source.vue'

import './components/svgIcon/index'


new Vue({
  el: '#app',
  render: h => h(Foo)
})
