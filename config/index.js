'use strict'

var config = {
  JWT_KEY: process.env.JWT_KEY || 'NeverShareYourSecret',
  CALLBACK_STATUS_MESSAGE: process.env.CALLBACK_STATUS_MESSAGE || 'Varselbrev produsert',
  CALLBACK_STATUS_URL: process.env.CALLBACK_STATUS_URL || false,
  JOB_DIRECTORY_PATH: process.env.JOB_DIRECTORY_PATH || 'test/data/jobs',
  DISTRIBUTION_DIRECTORY_PATH: process.env.DISTRIBUTION_DIRECTORY_PATH || 'test/data/distribution',
  ARCHIVE_DIRECTORY_PATH: process.env.ARCHIVE_DIRECTORY_PATH || 'test/data/archive',
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/data/done',
  ERROR_DIRECTORY_PATH: process.env.ERROR_DIRECTORY_PATH || 'test/data/errors',
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
