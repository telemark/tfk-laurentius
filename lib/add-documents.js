'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addDocuments = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': add-documents')

  var addThisDocuments = {
    generator: 'minelev-add-document',
    title: item.title,
    personalIdNumber: item.student.id,
    schoolName: item.school.name,
    schoolOrgNumber: item.school.orgId,
    caseNumber: item.caseNumber,
    file: item.documents[0].data,
    fileTitle: item.documents[0].title
  }

  var options = getMetadata(addThisDocuments)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': add-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
      return callback(null, JSON.stringify(data))
    }
  })
})

module.exports = addDocuments
