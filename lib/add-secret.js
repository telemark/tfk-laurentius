'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addSecret = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': add-secret-documents')

  item.secretNote = false
  var i = 0
  item.documents.forEach(function (document) {
    i++
    if (document.type === 'note-secret') {
      item.secretNote = true
      var secretNoteVal = i
      return
    }
  })

  // Checks if secret
  if (!item.student.secret) {
    console.log(item._id + ': add-secret-documents: skipping - secret is false')
    return callback(null, JSON.stringify(item))
  }

  var addThisDocuments = {
    generator: 'minelev-add-secret-document',
    title: item.title,
    personalIdNumber: item.student.id,
    contacts: item.contacts,
    schoolName: item.school.name,
    schoolOrgNumber: item.school.orgId,
    caseNumber: item.caseNumber,
    file: item.documents[secretNoteVal].data,
    fileTitle: item.documents[secretNoteVal].title
  }

  var options = getMetadata(addThisDocuments)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': add-secret-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = addSecret
