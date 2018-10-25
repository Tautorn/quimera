"use strict"

const getQuimeraFile = require('../get-quimera-file')
const loopCora = require('../loop')
const terminal = require('../terminal')
const chalk = require('chalk')

const log = console.log

const Start = (key) => {
  const quimera = getQuimeraFile({ confirmInMetaRepo: true })
  const projects = quimera.start[key || 'default']

  log(chalk.red(projects))

  loopCora({
    projects,
    command: `${terminal} "npm run start; bash"`,
  })

}

module.exports = Start()