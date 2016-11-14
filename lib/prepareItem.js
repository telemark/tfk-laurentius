'use strict'

const miss = require('mississippi')
const unwrapContact = require('tfk-dsf-unwrap-contact')
const unwrapParents = require('tfk-dsf-unwrap-parents')
const normalizeContact = require('tfk-dsf-normalize-contact')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  if (item.dsfError) {
    console.log(item._id + ': prepare-item: Skipping - dsfError')

    item.contacts = [
      {
        personalIdNumber: item.student.id,
        firstName: item.student.firstName,
        middleName: item.student.middleName,
        lastName: item.student.lastName,
        email: item.student.email,
        phone: item.student.phone,
        fullName: item.student.fullName,
        address: '',
        zip: '',
        city: ''
      }
    ]
    return callback(null, JSON.stringify(item))
  }

  let contacts = []

  // Main contact
  let contact1 = unwrapContact(item.dsfData)
  contact1 = normalizeContact(contact1)
  contact1.email = item.student.email
  contact1.phone = item.student.phone
  contacts.push(contact1)

  // If contact is not secret
  if (item.student.secret === false && typeof item.guardian !== 'undefined') {
    console.log(item._id + ': prepare-item: contact not secret or under 18 - adding parents')
    // Other contacts
    const altContacts = unwrapParents(item.dsfData)
    altContacts.forEach(function (parent) {
      let parentItem = normalizeContact(parent)
      if (parentItem.personalIdNumber === item.guardian.id) {
        parentItem.email = ''
        parentItem.phone = ''
        contacts.push(parentItem)
      }
    })
  } else {
    console.log(item._id + ': prepare-item: contact secret or over 18 - not adding parents')
  }

  item.contacts = contacts

  // console.log(JSON.stringify(item, null, 2))
  return callback(null, JSON.stringify(item))
})
