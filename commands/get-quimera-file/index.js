const findUpsync = require('findup-sync')
const fs = require('fs')
const path = require('path')
const util = require('util')
const debug = require('debug')

module.exports = function (options) {
  options = options || { warn: true }

  var quimera = null
  let buffer = null

  const quimeraLocation =
    fs.existsSync(path.join(process.cwd(), '.quimera'))
      ? path.join(process.cwd(), '.quimera')
      : findUpsync('.quimera', { cwd: process.cwd() })

  try {
    debug(`attempting to load .quimera file with module.exports format at ${quimeraLocation}`)
    quimera = require(quimeraLocation)
    debug(`.quimera file found at ${quimeraLocation}`)
  } catch (e) {
    debug(`no module.exports format .quimera file found at ${quimeraLocation}: ${e}`)
  }

  if (quimera) return quimera

  try {
    debug(`attempting to load .quimera file with json format at ${quimeraLocation}`)
    buffer = fs.readFileSync(quimeraLocation)
    debug(`.quimera file found at ${quimeraLocation}`)
  } catch (e) {
    debug(`no .quimera file found at ${quimeraLocation}: ${e}`)
  }

  if (buffer) {
    try {
      quimera = JSON.parse(buffer.toString())
      debug(`.quimera file contents parsed: ${util.inspect(quimera, null, Infinity)}`)
    } catch (e) {
      debug(`error parsing .quimera JSON: ${e}`)
    }
  }

  if ( ! quimera && options.warn) return console.error(`No .quimera file found in ${process.cwd()}. Are you in a quimera repo?`)

  return quimera

}

module.exports.getFileLocation = function () {
  return findUpsync('.quimera', { cwd: process.cwd() })
}