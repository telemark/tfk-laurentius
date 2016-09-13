'use strict'

const laurentius = require('./index')
const input = {}

laurentius(input, (error, message) => {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
