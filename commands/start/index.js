"use strict"

const getCoraFile = require('../get-cora-file')
const loopCora = require('../loop')
const terminal = require('../terminal')
const chalk = require('chalk')

const log = console.log

const Start = (key) => {
  const cora = getCoraFile({ confirmInMetaRepo: true })
  const projects = cora.start[key || 'default']

  log(chalk.red(projects))

  loopCora({
    projects,
    command: `${terminal} "npm run start; bash"`,
  })

}

module.exports = Start()