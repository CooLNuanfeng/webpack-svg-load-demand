import Vue from 'vue'
import Foo from './home/source.vue'

import SvgIcon from './components/svgIcon/index'


Vue.config.productionTip = false
Vue.use(SvgIcon)


new Vue({
  el: '#app',
  render: h => h(Foo)
})
