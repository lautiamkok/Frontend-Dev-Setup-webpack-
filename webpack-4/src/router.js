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

// Get the process env variables.
console.log('src/router.js: ROUTE_BASE =', ROUTE_BASE)

// Create the router.
const router = new VueRouter({
  base: ROUTE_BASE,
  mode: 'history',
  routes: Routes
})

// Apply to all routes.
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

// Apply to routes that have middleware key only.
// Get and run the middleware from each route.
// https://router.vuejs.org/guide/advanced/meta.html
router.beforeEach((to, from, next) => {
  // Check for middleware key in the meta property.
  // If no middleware key, then move on with next().
  if (!to.meta.middleware) {
    return next()
  }

  // If it is a single middleware only then make it into an array.
  const middleware = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware]

  // Pass the context to the middleware.
  const context = {
    to,
    from,
    next,
    router
  }

  // Break the chain here:
  // next({
  //   path: '/login',
  //   // name: 'home',
  // })

  // Loop the middleware stack with the recursive pipe function.
  // return pipe(middleware, context)

  // Loop the middleware stack with the JavaScript every method.
  return queue(middleware, context)

  // Loop each middleware for testing only. Note that you can't break forEach!
  // middleware.forEach(item => { item(context) })
})

// Loop the middleware stack with the every loop/method.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
function queue (middleware, context) {
  middleware.every(guard => {
    let quit = false
    guard({ ...context, next: (args) => {
      if (args) {
        context.next(args)
        quit = true
      }
      context.next()
    }})

    // Kill the loop if it is true.
    if (quit === true) { return false }

    // Continue the loop.
    return true
  })
}

// A recursive function to loop middleware.
function pipe (guards, context) {
  // Clone the array so we do not accidentally modify it.
  // Returns a shallow copy of a portion of an array into a new array object.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  const guardsLeft = guards.slice(0)
  console.log('total guards =', guardsLeft.length) // e.g. 2

  // Removes the first element from an array and returns that removed.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
  const nextGuard = guardsLeft.shift()
  console.log('guards left =', guardsLeft.length) // -1

  // Execute the middleware.
  nextGuard({ ...context, next: (args) => {
    if (args === undefined && guardsLeft.length !== 0) {
      // Loop the subsequent middleware in the stack with the same function.
      pipe(guardsLeft, context)
    }
    context.next(args)
  }})
}

export default router
