'use strict'

import About from '../pages/about.vue'
import log from '../middleware/log'
import layout from '../middleware/layout'

export default {
  name: 'about',
  path: '/about',
  meta: {
    // Set layout manually.
    // layout: 'dark',

    // Set layout using middleware.
    // Multiple middleware:
    middleware: [log, layout, log]

    // Single middleware:
    // middleware: layout
  },
  component: About
}
