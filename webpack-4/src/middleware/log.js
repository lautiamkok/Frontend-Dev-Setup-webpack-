'use strict'

export default async ({ next, to }) => {
  console.log('log middleware, to =', to)

  // Break the chain here:
  // next({ path: '/login' })

  // Move on to the next middleware.
  next()
}
