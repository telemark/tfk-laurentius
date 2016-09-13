'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')
const util = require('util')

function isCaseWritable (cases, id) {
  let result = false
  cases.forEach(function (aCase) {
    if (aCase.Status === 'Under behandling') {
      result = aCase.CaseNumber
      console.log(id + ': get-case: found case: ' + result)
      return result
    } else {
      console.log(id + ': get-case: skipping case: ' + aCase.CaseNumber + ' status: ' + aCase.Status)
    }
  })
  return result
}

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  console.log(item._id + ': get-case')

  const getThisCase = {
    generator: 'get-case-title',
    title: 'Elevmappe',
    id: item.student.id
  }

  let options = getMetadata(getThisCase)
  options.p360 = config.p360

  // console.log(JSON.stringify(options, null, 2))
  item.caseNumber = false

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    }
    if (data.GetCasesResult.Cases.CaseResult !== null && util.isArray(data.GetCasesResult.Cases.CaseResult) && data.GetCasesResult.Cases.CaseResult.length !== 0) {
      item.caseNumber = isCaseWritable(data.GetCasesResult.Cases.CaseResult, item._id)
    }
    return callback(null, JSON.stringify(item))
  })
})
