#!/usr/bin/env node

import { argv } from 'optimist'
import { dclone } from './dclone'

const dir = argv._[0]
dclone(dir).catch(err => {
  console.log(err)
  process.exit()
})
