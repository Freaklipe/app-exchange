import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/AboutView.vue'
import Error from './views/ErrorView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '*',
      name: 'Error',
      component: Error,
    },
  ],
})
