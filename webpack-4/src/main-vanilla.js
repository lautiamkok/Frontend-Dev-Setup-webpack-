'use strict'

import Vue from 'vue'
import Sample from './assets/javascripts/modules/sample/index'

// Sample class evocation.
let x = new Sample()
async function start () {
  console.log(await x.multiply(2)) // return 4
}
start()

Vue.component('custom-component-1', {
  data () {
    return {
      items: [
        { id: 1, image: 'static/sample-1.jpg' },
        { id: 2, image: 'static/sample-2.jpg' },
        { id: 3, image: 'static/sample-3.jpg' }
      ]
    }
  }
})

Vue.component('custom-component-2', {
  data () {
    return {
      message: 'hello world 2',
    }
  }
})

new Vue({
  el: '#app'
})
