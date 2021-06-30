'use strict'

import Vue from 'vue'
import mitt from 'mitt'

import Sample from './assets/javascripts/modules/sample/index'

// Sample class evocation.
let x = new Sample()
async function start () {
  console.log(await x.multiply(2)) // return 4
}
start()

// Create a event bus for passing data between components, instead of using
// Vuex.
// https://blog.logrocket.com/using-event-bus-in-vue-js-to-pass-data-between-components/
// https://stackoverflow.com/questions/43155274/passing-data-between-child-components
// https://andrejsabrickis.medium.com/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860
const Bus = new Vue()

// Use mitt instead for Vue.js 3.
// https://v3.vuejs.org/guide/migration/events-api.html#migration-strategy
const Emitter = mitt ()

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

// Slots
Vue.component('component-slot-1', {
  template: '<div><h1>component-slot-1</h1><slot v-bind:message="message"></slot></div>',
  data () {
    return {
      message: 'hello world 2',
    }
  }
})

Vue.component('component-slot-2', {
  template: '<div><h1>component-slot-2</h1><slot v-bind:message="message"></slot></div>',
  props: ['message'],
})

Vue.component('component-slot-3', {
  template: '<div><h1>component-slot-3</h1><slot v-bind:message="message"></slot></div>',
  data () {
    return {
      message: '',
    }
  },
  created () {
    Bus.$on('changeMessage', (message) => {
      this.message = message
    })
  }
})

Vue.component('component-slot-4', {
  template: '<div><h1>component-slot-4</h1><slot v-bind:content="content"></slot></div>',
  data () {
    return {
      content: '',
    }
  },

  mounted () {
    Emitter.on('changeContent', (data) => {
      this.content = data
    })
  }
})

new Vue({
  el: '#app',

  data () {
    return {
      hello: 'Hello from parent',
    }
  },

  methods: {
    emitMessage () {
      Bus.$emit('changeMessage', 'emitted from parent')
    },

    emitContent () {
      Emitter.$emit('changeContent', 'emitted from parent')
    },
  }
})
