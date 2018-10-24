"use strict"

const getCoraFile = require('../get-cora-file')
const loopCora = require('../loop')
const chalk = require('chalk')

const log = console.log

const Install = () => {
  const cora = getCoraFile({ confirmInMetaRepo: true })
  const projects = cora.projects

  log(chalk.red(projects))

  loopCora({
    projects,
    command: 'npm install'
  })

}

module.exports = Install()