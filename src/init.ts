#!/usr/bin/env node

import Shell from 'shelljs'
import { argv } from 'optimist'
import { Options } from './interface/options'
import { dclone } from './dclone'
const { version } = require('../package.json')
const dir = argv._[0]

if (argv.v) {
  Shell.echo(version)
  process.exit()
}

const options: Options = {
  dir,
  http: argv.http
}

dclone(options).catch(err => {
  Shell.rm('-rf', '.git')
  console.log(err)
  process.exit()
})

process.on('SIGINT', () => {
  Shell.rm('-rf', '.git')
  console.log('进程中途终止')
  process.exit()
})
