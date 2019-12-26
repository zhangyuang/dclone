import fs from 'fs'
import Shell from 'shelljs'
import { promisify } from 'util'
import ora from 'ora'
import inquirer from 'inquirer'
import { exec }from 'child_process'

interface Answers {
  delete?: boolean
}

const execWithPromise = promisify(exec)

const cloneRoot = async (rootDir: string) => {
  const spinner = ora(`${rootDir} is cloning`)
  spinner.start()
  await execWithPromise(`git clone ${rootDir}.git`)
  spinner.succeed()
}

const checkDirExisted = async (dir: string) => {
  if (fs.existsSync(dir)) {
    const answers: Answers = await inquirer.prompt([{
      type: 'confirm',
      message: `${dir} folder already existed whether delete?`,
      name: 'delete',
      default: 'Yes'
    }])
    if (answers.delete) {
      Shell.rm('-rf', dir)
      console.log(`${dir} folder delete succeed`)
    } else process.exit()
  }
}

const deepCloneDirectory = async (rootDir: string, distDirName: string, branch: string) => {
  const spinner = ora(`${distDirName} is cloning`)
  spinner.start()
  await execWithPromise(`git init && git config core.sparsecheckout true`) // 设置允许克隆子目录
  await execWithPromise(`echo ${distDirName} > .git/info/sparse-checkout`) // clone 指定文件夹
  await execWithPromise(`git remote add origin ${rootDir}.git`)
  await execWithPromise(`git pull origin ${branch}`)
  spinner.succeed()
}

const httpToSSH = (rootDir: string, dir: string) => {
  const isGitLab = /gitlab/i.test(dir)
  let res
  // gitlab下http地址转ssh
  res = rootDir[rootDir.length - 1] === '/' ? rootDir.slice(0, rootDir.length - 1) : rootDir
  if (!isGitLab) return res
  res = res.replace(/https?:\/\//, '')
  const index = res.indexOf('/')
  res = res.substring(0, index) + ':' + res.substring(index + 1)
  return 'git@' + res
}
const dclone = async (dir?: string) => {
  if (!dir) {
    console.error('please enter the name of directory')
    return
  }
  let [rootDir, ...distDirArr] = dir.split('tree')
  rootDir = httpToSSH(rootDir, dir)
  if (distDirArr.length === 0) {
    await cloneRoot(rootDir) // 说明clone的是根目录
    return
  }
  const distDir = distDirArr.length > 1 ? distDirArr.join('tree') : distDirArr.join('') // 修复url中存在多个tree的情况，只以第一个作为分割点
  const [, branch, ...distDirNameArr] = distDir.split('/')
  await checkDirExisted(distDirNameArr[0])
  const distDirName = distDirNameArr.join('/')
  await deepCloneDirectory(rootDir, distDirName, branch) // 深度clone子目录
  Shell.rm('-rf', '.git')
  process.exit()
}

export {
  dclone,
  httpToSSH
}
