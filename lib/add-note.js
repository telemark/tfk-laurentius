'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addNote = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': add-note-documents')

  item.dsfNote = false
  var i = 0
  item.documents.forEach(function (document) {
    i++
    if (document.type === 'note-dsf') {
      item.dsfNote = true
      var dsfNoteVal = i
      return
    }
  })

  // Checks if note exists
  if (!item.dsfNote) {
    console.log(item._id + ': add-note-documents: skipping - not set')
    return callback(null, JSON.stringify(item))
  }

  console.log(item.documents[i])
  var addThisDocuments = {
    generator: 'minelev-add-document',
    title: item.title,
    personalIdNumber: item.student.id,
    contacts: item.contacts,
    schoolName: item.school.name,
    schoolOrgNumber: item.school.orgId,
    caseNumber: item.caseNumber,
    file: item.documents[dsfNoteVal].data,
    fileTitle: item.documents[dsfNoteVal].title
  }

  var options = getMetadata(addThisDocuments)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': add-note-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = addNote
