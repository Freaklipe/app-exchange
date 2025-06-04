import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import { BounceLoader, BeatLoader } from '@saeris/vue-spinners'

import router from '@/router'
import { dollarFilter, percentFilter } from '@/filters'

Vue.use(Chartkick.use(Chart))
Vue.component('bounce-loader', BounceLoader)
Vue.component('beat-loader', BeatLoader)
Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
