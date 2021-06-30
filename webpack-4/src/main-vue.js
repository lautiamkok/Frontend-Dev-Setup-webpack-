'use strict'

import Vue from 'vue'
import App from './App.vue'

import { currentScreen } from './assets/javascripts/utils'
import Sample from './assets/javascripts/modules/sample/index'

import Default from './layouts/default.vue'
import Dark from './layouts/dark.vue'

import router from './router'
import store from './store'

Vue.component('layout-default', Default)
Vue.component('layout-dark', Dark)

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,

  components: {
    App
  },

  async mounted () {
    // Sample class evocation.
    let x = new Sample()
    console.log(await x.multiply(2)) // return 4

    // Get current screen size on resize.
    currentScreen()
  }
})
