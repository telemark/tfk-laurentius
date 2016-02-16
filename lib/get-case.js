'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var getCase = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  var getThisCase = {
    generator: 'get-case-title',
    title: 'Elevmappe',
    id: item.student.id
  }

  var options = getMetadata(getThisCase)
  options.p360 = config.p360

//  console.log(JSON.stringify(options, null, 2))
//  process.exit()
  item.laurentius.caseNumber = false

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    }
    if (data.GetCasesResult.Cases.CaseResult !== null && data.GetCasesResult.Cases.CaseResult[0] !== 'undefined') {
      item.laurentius.caseNumber = data.GetCasesResult.Cases.CaseResult[0].CaseNumber
    }
    return callback(null, JSON.stringify(item))
  })
})

module.exports = getCase
