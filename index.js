'use strict'

module.exports = (item, callback) => {
  const miss = require('mississippi')
  const streamifier = require('streamifier')
  const getNextJob = require('./lib/get-next-job')
  const prepareItem = require('./lib/prepareItem')
  const searchContact = require('./lib/search-contact')
  const addContact = require('./lib/add-private-person')
  const getCase = require('./lib/get-case')
  const addCase = require('./lib/add-case')
  const addDocuments = require('./lib/add-documents')
  //const addDocumentsNote = require('./lib/add-documents-note.js')
  const addSecret = require('./lib/add-secret')
  const addNote = require('./lib/add-note')
  const saveJob = require('./lib/save-job-archive')
  const cleanUp = require('./lib/cleanup-job')
  const sendStatusMessage = require('./lib/send-status-message')
  const starter = streamifier.createReadStream(JSON.stringify(item))

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
    //addDocumentsNote,
    addSecret,
    addNote,
    saveJob,
    cleanUp,
    sendStatusMessage,
    finished
  )
}
