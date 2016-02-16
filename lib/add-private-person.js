'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addContact = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  // If contact exist skip step
  if (item.laurentius.studentContact) {
    return callback(null, JSON.stringify(item))
  }

  var addPrivatePerson = {
    generator: 'add-private-person',
    firstName: item.student.firstName,
    middleName: item.student.middleName,
    lastName: item.student.lastName,
    personalIdNumber: item.student.id,
    email: item.student.email,
    streetAddress: 'test 32',
    zipCode: '3714',
    zipPlace: 'Skien',
    area: 'Telemark'
  }

  var options = getMetadata(addPrivatePerson)
  options.p360 = config.p360

//   console.log(JSON.stringify(options, null, 2))
//   process.exit()

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(JSON.stringify(data))
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = addContact
