'use strict'

var miss = require('mississippi')

var getStatus = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(JSON.stringify(item, null, 2))
  return callback(null, JSON.stringify(item))
})

module.exports = getStatus
