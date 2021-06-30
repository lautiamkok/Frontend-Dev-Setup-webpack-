'use strict'

export default async ({ next, to }) => {
  console.log('layout middleware, to =', to)

  // Kill the chain here:
  // next({ path: '/login' })

  // Get the layout value from the fetched data using axios for example.
  to.meta.layout = 'dark'
  next()
}
