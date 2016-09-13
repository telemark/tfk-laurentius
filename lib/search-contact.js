'use strict'

const miss = require('mississippi')
const getMetadata = require('tfk-arkiv-metadatagenerator')
const p360 = require('p360')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  if (item.dsfError) {
    return callback(null, JSON.stringify(item))
  }

  console.log(item._id + ': search-contact')
  let i = 0

  item.contacts.forEach(function (contact) {
    console.log(item._id + ': search-contact: ' + contact.fullName)

    const getPrivatePerson = {
      generator: 'get-private-persons-id',
      personalIdNumber: contact.personalIdNumber
    }

    let options = getMetadata(getPrivatePerson)
    options.p360 = config.p360

    p360(options, function (err, data) {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        item.contacts[i].exists = false
        const privatePersons = data.GetPrivatePersonsResult.PrivatePersons
        if (Array.isArray(privatePersons.PrivatePersonBase)) {
          item.contacts[i].exists = true
          console.log(item._id + ': search-contact: ' + contact.fullName + ': exists in p360')
          // result = data.GetPrivatePersonsResult.PrivatePersons.PrivatePersonBase[0]
        }
        i++
        if (item.contacts.length === i) {
          return callback(null, JSON.stringify(item))
        }
      }
    })
  })
})
