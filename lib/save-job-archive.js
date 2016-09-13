'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  const fileName = config.ARCHIVE_DONE_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log(item._id + ': save-job-archive-done')
  fs.writeFileSync(fileName, JSON.stringify(item, null, 2))

  return callback(null, JSON.stringify(item))
})
