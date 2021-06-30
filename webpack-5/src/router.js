'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Routes from './routes'
// import Layout from './middleware/layout'

// Install router plugins.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// https://github.com/vuejs/vue-router
Vue.use(VueRouter)

// A quick fix for "vueRouter:Avoided redundant navigation to current location".
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// Create the router.
const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

// Apply to all routes: option 1.
// router.beforeEach(Layout)

// Apply to all routes: option 2.
// router.beforeEach((to, from, next) => {
//   // Pass the context to the middleware.
//   const context = {
//     from,
//     next,
//     to,
//     router
//   }
//   return Layout({ ...context })
// })

export default router
