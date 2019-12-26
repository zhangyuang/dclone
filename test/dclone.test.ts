import fs from 'fs'
import Shell from 'shelljs'
import { dclone, httpToSSH } from '../src/dclone'

jest.setTimeout(100000)
// @ts-ignore
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    //
})
// @ts-ignore
const mockError = jest.spyOn(console, 'error').mockImplementation(() => {
    //
})
jest.mock('inquirer', () => ({
  prompt: jest.fn().mockReturnValueOnce({
    delete: true
  }).mockReturnValueOnce({
    delete: false
  })
}))
describe('test dclone', () => {
  beforeEach(() => {
    Shell.mkdir('-p','temp')
    Shell.cd('temp')
  })
  test('not input dir should exit', async () => {
    await dclone()
    expect(mockError).toBeCalled()
  })
  test('expect ssr-with-loadable can be download', async () => {
    Shell.mkdir('-p','example')
    await dclone('https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable')
    expect(fs.existsSync('./example')).toBe(true)
    expect(fs.existsSync('./example/ssr-with-loadable')).toBe(true)
  })
  test('process.exit should be called', async () => {
    Shell.mkdir('-p','example')
    await dclone('https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable')
    expect(mockExit).toBeCalled()
  })
  test('rootDir can be git clone ', async () => {
    await dclone('https://github.com/ykfe/egg-react-ssr')
    expect(fs.existsSync('./egg-react-ssr')).toBe(true)
  })
  test('url has multiply tree can clone succeed', async (done) => {
    await dclone('https://github.com/ReactiveX/rxjs/tree/experiment-trex/doc/decision-tree-widget')
    expect(fs.existsSync('./doc')).toBe(true)
    expect(fs.existsSync('./doc/decision-tree-widget')).toBe(true)
    done()
  })
  afterEach(() => {
    Shell.cd('../')
    Shell.rm('-rf','temp')
  })
  afterAll(async (done) => {
    done()
  })
})

describe('test httpToSSH', () => {
  const res = httpToSSH('http://gitlab.xx.com/xxx/xxxx', 'http://gitlab.xx.com/xxx/xxxx/tree/master/xxx')
  expect(res).toEqual('git@gitlab.xx.com:xxx/xxxx')
})
