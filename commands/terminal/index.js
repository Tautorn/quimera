"use strict"

const getCoraFile = require('../get-cora-file')
const chalk = require('chalk')

const log = console.log

const Terminal = () => {
  const terminal = getCoraFile({ confirmInMetaRepo: true }).terminal
  const so = process.platform

  log(chalk.blue(`Using SO ${so}`))

  return terminal[so]

}

module.exports = Terminal()