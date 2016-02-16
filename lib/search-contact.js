'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var searchContact = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  var getPrivatePerson = {
    generator: 'get-private-persons-name',
    personalIdNumber: item.student.id
  }

  var options = getMetadata(getPrivatePerson)
  options.p360 = config.p360

  // console.log(JSON.stringify(options, null, 2))

  item.laurentius = {
    studentContact: false
  }

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      if (data.GetPrivatePersonsResult.PrivatePersons.PrivatePersonBase !== null && data.GetPrivatePersonsResult.PrivatePersons.PrivatePersonBase[0] !== 'undefined') {
        item.laurentius.studentContact = data.GetPrivatePersonsResult.PrivatePersons.PrivatePersonBase[0]
      }
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = searchContact
