'use strict'

const miss = require('mississippi')
const Wreck = require('wreck')
const generateToken = require('../lib/generate-token')
const config = require('../config')
const token = generateToken({key: config.JWT_KEY, payload: {system: 'laurentius'}})
const wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  if (item.CALLBACK_STATUS_URL) {
    console.log(item._id + ': send-status-message')
    wreckOptions.payload = JSON.stringify({status: config.CALLBACK_STATUS_MESSAGE})
    Wreck.post(item.CALLBACK_STATUS_URL, wreckOptions, (error, response, payload) => {
      if (error) {
        return callback(error, null)
      } else {
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    console.log(item._id + ': send-status-message No message to send')
    return callback(null, JSON.stringify(item))
  }
})
