"use strict"

const getQuimeraFile = require('../get-quimera-file')
const loopQuimera = require('../loop')
const chalk = require('chalk')

const log = console.log

const Install = () => {
  const quimera = getQuimeraFile({ confirmInMetaRepo: true })
  const projects = quimera.projects

  log(chalk.red(projects))

  loopQuimera({
    projects,
    command: 'npm install'
  })

}

module.exports = Install()