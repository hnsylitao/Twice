'use strict';

const appName = 'twice'
const appTitlePrefix = `twice`
const version = __VERSION
const isDev = __ENV === 'dev'
const isTest = __ENV === 'test'
const isProd = __ENV === 'prod'

export default {
  appName: appName,
  appTitlePrefix: appTitlePrefix,
  version: version,
  env: __ENV,
  isDev: isDev,
  isTest: isTest,
  isProd: isProd,
  debug: false,
}