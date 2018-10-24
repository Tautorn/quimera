"use strict"

const getQuimeraFile = require('../get-quimera-file')
const chalk = require('chalk')

const log = console.log

const Terminal = () => {
  const terminal = getQuimeraFile({ confirmInMetaRepo: true }).terminal
  const so = process.platform

  log(chalk.blue(`Using SO ${so}`))

  return terminal[so]

}

module.exports = Terminal()