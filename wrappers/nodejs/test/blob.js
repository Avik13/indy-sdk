var test = require('ava')
var path = require('path')
var indy = require('../')
var indyHomeDir = require('home-dir')('.indy_client')

test('blob_storage', async function (t) {
  var config = {
    'base_dir': path.join(indyHomeDir, 'tails'),
    'uri_pattern': ''
  }

  var wh = await indy.openBlobStorageWriter('default', config)
  t.is(typeof wh, 'number')
  t.truthy(wh >= 0)

  var rh = await indy.openBlobStorageReader('default', config)
  t.is(typeof rh, 'number')
  t.truthy(rh >= 0)

  var error = await t.throws(indy.openBlobStorageWriter('foo', config))
  t.is(error.indyName, 'CommonInvalidStructure')

  error = await t.throws(indy.openBlobStorageWriter('default', null))
  t.is(error.indyName, 'CommonInvalidParam3')

  error = await t.throws(indy.openBlobStorageReader('foo', config))
  t.is(error.indyName, 'CommonInvalidStructure')
})
