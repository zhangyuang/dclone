import fs from 'fs'
import Shell from 'shelljs'
import { dclone } from '../src/dclone'

jest.setTimeout(10000)
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
  test('rootDir can be git clone', async () => {
    await dclone('https://github.com/ykfe/egg-react-ssr')
    expect(fs.existsSync('./egg-react-ssr')).toBe(true)
  })
  afterEach(() => {
    Shell.cd('../')
    Shell.rm('-rf','temp')
  })
})
