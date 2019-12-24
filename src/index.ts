#!/usr/bin/env node

import fs from 'fs'
import Shell from 'shelljs'
import ora from 'ora'
import inquirer from 'inquirer'
import { execSync }from 'child_process'
import { argv } from 'optimist'

interface Answers {
  delete?: boolean
}

(async () => {
  const dir: string = argv._[0]
  if (!dir) {
    console.error('please enter the name of directory')
    return
  }
  // 当前clone的是否是根目录
  const isRoot = typeof dir.split('tree')[1] === 'undefined' // tslint:disable-line
  let rootDir = dir.split('tree')[0]
  if (isRoot) {
       // 说明clone的是根目录
    const spinner = ora(`${rootDir} is cloning`)
    spinner.start()
    execSync(`git clone ${rootDir}.git`)
    spinner.succeed()
    return
  }
  rootDir = rootDir.slice(0, rootDir.length - 1) // 去除最后一个斜杠获取正确的git仓库地址
  let distDir = dir.split('tree')[1] // 获取目标目录路径
  const branch = distDir.split('/')[1] // 获取分支名称
  distDir = dir.split('tree')[1].replace(`/${branch}`, '') // 路径移除分支名
  const distDirName = distDir.split('/')[1] // clone 到本地的文件夹名称
  const spinner = ora(`${distDir} is cloning`)
  if (fs.existsSync(distDirName)) {
    const answers: Answers = await inquirer.prompt([{
      type: 'confirm',
      message: `${distDir} already existed whether delete?`,
      name: 'delete',
      default: 'Yes'
    }])
    if (answers.delete) {
      Shell.rm('-rf', distDirName)
      console.log(`${distDir} delete succeed`)
    } else process.exit()
  }
  execSync(`git init && git config core.sparsecheckout true`) // 设置允许克隆子目录
  execSync(`echo ${distDir} > .git/info/sparse-checkout`) // clone 指定文件夹
  execSync(`git remote add origin ${rootDir}.git`)
  spinner.start()
  execSync(`git pull origin ${branch}`)
  Shell.rm('-rf', '.git')
  spinner.succeed()
  process.exit()
})().catch(err => {
  console.log(err)
  process.exit()
})
