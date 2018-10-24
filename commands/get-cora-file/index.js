const findUpsync = require('findup-sync')
const fs = require('fs')
const path = require('path')
const util = require('util')
const debug = require('debug')

module.exports = function (options) {
  options = options || { warn: true }

  var cora = null
  let buffer = null

  const coraLocation =
    fs.existsSync(path.join(process.cwd(), '.cora'))
      ? path.join(process.cwd(), '.cora')
      : findUpsync('.cora', { cwd: process.cwd() })

  try {
    debug(`attempting to load .cora file with module.exports format at ${coraLocation}`)
    cora = require(coraLocation)
    debug(`.cora file found at ${coraLocation}`)
  } catch (e) {
    debug(`no module.exports format .cora file found at ${coraLocation}: ${e}`)
  }

  if (cora) return cora

  try {
    debug(`attempting to load .cora file with json format at ${coraLocation}`)
    buffer = fs.readFileSync(coraLocation)
    debug(`.cora file found at ${coraLocation}`)
  } catch (e) {
    debug(`no .cora file found at ${coraLocation}: ${e}`)
  }

  if (buffer) {
    try {
      cora = JSON.parse(buffer.toString())
      debug(`.cora file contents parsed: ${util.inspect(cora, null, Infinity)}`)
    } catch (e) {
      debug(`error parsing .cora JSON: ${e}`)
    }
  }

  if ( ! cora && options.warn) return console.error(`No .cora file found in ${process.cwd()}. Are you in a cora repo?`)

  return cora

}

module.exports.getFileLocation = function () {
  return findUpsync('.cora', { cwd: process.cwd() })
}