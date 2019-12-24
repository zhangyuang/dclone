#!/usr/bin/env node

import Shell from 'shelljs'
import { argv } from 'optimist'
import { dclone } from './dclone'

const dir = argv._[0]
dclone(dir).catch(err => {
  Shell.rm('-rf', '.git')
  console.log(err)
  process.exit()
})

process.on('SIGINT', () => {
  Shell.rm('-rf', '.git')
  console.log('进程中途终止')
  process.exit()
})
