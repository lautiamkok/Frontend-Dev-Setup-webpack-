'use strict'

import $ from 'jquery'
import 'foundation-sites'

async function example1 () {
  return 'example A'
}

async function example2 () {
  return 'example B'
}

function currentScreen () {
  window.addEventListener('resize', () => {
    console.log('current screen size =',
      Foundation.MediaQuery.current
    )
  })
}

export {
  example1,
  example2,
  currentScreen
}
