'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  console.log(item._id + ': add-documents')

  let i = 0
  let value = false
  item.documents.forEach(function (document) {
    if (document.type === 'warning') {
      value = i
    }
    i++
  })

  if (value === false) {
    console.log(item._id + ': add-documents: skipping - no documents found')
    return callback('No warning documets found')
  }

  const addThisDocuments = {
    generator: 'minelev-add-document',
    title: item.documents[value].title,
    offTitle: item.documents[value].offTitle,
    personalIdNumber: item.student.id,
    contacts: item.contacts,
    schoolName: item.school.name,
    schoolOrgNumber: item.school.orgId,
    caseNumber: item.caseNumber,
    file: item.documents[value].data,
    fileTitle: item.documentTitle + '.pdf'
  }

  let options = getMetadata(addThisDocuments)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': add-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})
