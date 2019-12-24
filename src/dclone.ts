import fs from 'fs'
import Shell from 'shelljs'
import ora from 'ora'
import inquirer from 'inquirer'
import { execSync }from 'child_process'

interface Answers {
  delete?: boolean
}

const dclone = async (dir?: string) => {
  if (!dir) {
    console.error('please enter the name of directory')
    return
  }
  let [rootDir, distDir] = dir.split('tree')
  if (!distDir) {
    // 说明clone的是根目录
    const spinner = ora(`${rootDir} is cloning`)
    spinner.start()
    execSync(`git clone ${rootDir}.git`)
    spinner.succeed()
    return
  }
  rootDir = rootDir.slice(0, rootDir.length - 1) // 去除最后一个斜杠获取正确的git仓库地址
  const [, branch, ...distDirNameArr] = distDir.split('/')
  const distDirName = distDirNameArr.join('/')
  const spinner = ora(`${distDirName} is cloning`)
  if (fs.existsSync(distDirNameArr[0])) {
    const answers: Answers = await inquirer.prompt([{
      type: 'confirm',
      message: `${distDirNameArr[0]} folder already existed whether delete?`,
      name: 'delete',
      default: 'Yes'
    }])
    if (answers.delete) {
      Shell.rm('-rf', distDirNameArr[0])
      console.log(`${distDirNameArr[0]} folder delete succeed`)
    } else process.exit()
  }
  execSync(`git init && git config core.sparsecheckout true`) // 设置允许克隆子目录
  execSync(`echo ${distDirName} > .git/info/sparse-checkout`) // clone 指定文件夹
  execSync(`git remote add origin ${rootDir}.git`)
  spinner.start()
  execSync(`git pull origin ${branch}`)
  Shell.rm('-rf', '.git')
  spinner.succeed()
  process.exit()
}

export {
  dclone
}
