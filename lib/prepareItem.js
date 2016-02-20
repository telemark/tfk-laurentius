'use strict'

var miss = require('mississippi')
var unwrapContact = require('tfk-dsf-unwrap-contact')
var unwrapParents = require('tfk-dsf-unwrap-parents')
var normalizeContact = require('tfk-dsf-normalize-contact')

var prepareItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  var contacts = []

  // Main contact
  var contact1 = unwrapContact(item.dsfData)
  contact1 = normalizeContact(contact1)
  contact1.email = item.student.email
  contact1.phone = item.student.phone
  contacts.push(contact1)

  // If contact is not secret
  if (!item.student.secret) {
    console.log(item._id + ': prepare-item: contact not secret - adding parents')
    // Other contacts
    var altContacts = unwrapParents(item.dsfData)
    altContacts.forEach(function (parent) {
      var parentItem = normalizeContact(parent)
      parentItem.email = ''
      parentItem.phone = ''
      contacts.push(parentItem)
    })
  }

  item.contacts = contacts

  //console.log(JSON.stringify(item, null, 2))
  return callback(null, JSON.stringify(item))
})

module.exports = prepareItem
