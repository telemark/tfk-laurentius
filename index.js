'use strict'

function tfkLaurentius (item, callback) {
  var miss = require('mississippi')
  var streamifier = require('streamifier')
  var getNextJob = require('./lib/get-next-job')
  var searchContact = require('./lib/search-contact')
  var addContact = require('./lib/add-private-person')
  var getStatus = require('./lib/getStatus')
  var getCase = require('./lib/get-case')
  var addCase = require('./lib/add-case')
  var addDocuments = require('./lib/add-documents.js')
  var starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error, data) {
    if (error) {
      callback(error, null)
    }
  }

  miss.pipe(
    starter,
    getNextJob,
    searchContact,
    addContact,
    getCase,
    addCase,
    addDocuments,
    getStatus,
    finished
  )
}

module.exports = tfkLaurentius
