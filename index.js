'use strict'

function tfkLaurentius (item, callback) {
  var miss = require('mississippi')
  var streamifier = require('streamifier')
  var getNextJob = require('./lib/get-next-job')
  var prepareItem = require('./lib/prepareItem')
  var searchContact = require('./lib/search-contact')
  var addContact = require('./lib/add-private-person')
  var getCase = require('./lib/get-case')
  var addCase = require('./lib/add-case')
  var addDocuments = require('./lib/add-documents')
  var addSecret = require('./lib/add-secret')
  var addNote = require('./lib/add-note')
  var starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error, data) {
    if (error) {
      callback(error, null)
    }
  }

  miss.pipe(
    starter,
    getNextJob,
    prepareItem,
    searchContact,
    addContact,
    getCase,
    addCase,
    addDocuments,
    addSecret,
    addNote,
    finished
  )
}

module.exports = tfkLaurentius
