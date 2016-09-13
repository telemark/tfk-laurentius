'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  console.log(item._id + ': add-case')

  // If elevmappe exist break
  if (item.caseNumber) {
    console.log(item._id + ': add-case: case exists: ' + item.caseNumber)
    return callback(null, JSON.stringify(item))
  }

  const addThisCase = {
    generator: 'elevmappe-add-case',
    personalIdNumber: item.student.id,
    fullName: item.student.fullName
  }

  let options = getMetadata(addThisCase)
  options.p360 = config.p360

  // console.log(JSON.stringify(item, null, 2))
  // process.exit()

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      item.caseNumber = data.CreateCaseResult.CaseNumber
      console.log(item._id + ': add-case : created case: ' + item.caseNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})
