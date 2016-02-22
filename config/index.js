'use strict'

var config = {
  JWT_KEY: process.env.JWT_KEY || 'NeverShareYourSecret',
  CALLBACK_STATUS_MESSAGE: process.env.CALLBACK_STATUS_MESSAGE || 'Varselbrev produsert',
  CALLBACK_STATUS_URL: process.env.CALLBACK_STATUS_URL || false,
  ARCHIVE_JOB_DIRECTORY_PATH: process.env.ARCHIVE_JOB_DIRECTORY_PATH || 'test/data/archive/jobs',
  ARCHIVE_DONE_DIRECTORY_PATH: process.env.ARCHIVE_DONE_DIRECTORY_PATH || 'test/data/archive/done',
  ARCHIVE_ERROR_DIRECTORY_PATH: process.env.ARCHIVE_ERROR_DIRECTORY_PATH || 'test/data/archive/errors',
  p360: {
    user: 'domain/username', // username
    password: 'password', // passord
    baseUrl: 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  }
}

module.exports = config
