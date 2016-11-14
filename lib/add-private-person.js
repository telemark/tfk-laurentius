'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  console.log(item._id + ': add-private-person')

  let i = 0
  item.contacts.forEach(function (contact) {
    console.log(item._id + ': add-private-person: ' + contact.fullName)

    const addPrivatePerson = {
      generator: 'add-private-person',
      firstName: contact.firstName,
      middleName: contact.middleName,
      lastName: contact.lastName,
      personalIdNumber: contact.personalIdNumber,
      email: contact.email,
      phone: contact.phone,
      streetAddress: contact.address,
      zipCode: contact.zip,
      zipPlace: contact.city,
      area: 'Telemark'
    }

    let options = getMetadata(addPrivatePerson)
    options.p360 = config.p360

    p360(options, function (err, data) {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        i++
        console.log(item._id + ': add-private-person: ' + contact.fullName + ': Updated or created private person')
        if (item.contacts.length === i) {
          return callback(null, JSON.stringify(item))
        }
      }
    })
  })
})
