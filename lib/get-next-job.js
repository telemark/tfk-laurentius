'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var getNextJob = miss.through(function (chunck, encoding, callback) {
  var jobs = fs.readdirSync(config.ARCHIVE_DIRECTORY_PATH)
  var item

  console.log('get-next-job')

  if (jobs.length > 0) {
    console.log('File: ' + jobs[0])
    item = fs.readFileSync(config.ARCHIVE_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    return callback(new Error('No jobs in queue'), null)
  }
})

module.exports = getNextJob
