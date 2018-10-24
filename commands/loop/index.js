"use strict"

const getCoraFile = require('../get-cora-file')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const chalk = require('chalk')
const log = console.log

async function trigger({ command, project }) {
  log(chalk.green(project))
  await exec(`cd ./${project} && ${command}`)
}

function Loop({ projects, command }) {

  const path = getCoraFile({ confirmInMetaRepo: true }).path

  projects.map( async project => {

    await trigger({
      command,
      project: `${path}/${project}`
    })

  })

}

module.exports = Loop