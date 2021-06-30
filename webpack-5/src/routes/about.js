'use strict'

import multiguard from 'vue-router-multiguard'
import About from '../pages/about.vue'
import log from '../middleware/log'
import layout from '../middleware/layout'

export default {
  name: 'about',
  path: '/about',
  // Use middle to handle layout dynamically instead.
  // meta: { layout: 'dark'},
  // Per-Route Guard
  // https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
  // beforeEnter: (to, from, next) => {
  //   console.log('beforeEnter:from =', from)
  //   next()
  // },
  beforeEnter: multiguard([layout, log]),
  component: About
}
