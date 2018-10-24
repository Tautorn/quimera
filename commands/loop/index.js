"use strict"

const getQuimeraFile = require('../get-quimera-file')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const chalk = require('chalk')
const log = console.log

async function trigger({ command, project }) {
  log(chalk.green(project))
  await exec(`cd ./${project} && ${command}`)
}

function Loop({ projects, command }) {

  const path = getQuimeraFile({ confirmInMetaRepo: true }).path

  projects.map( async project => {

    await trigger({
      command,
      project: `${path}/${project}`
    })

  })

}

module.exports = Loop