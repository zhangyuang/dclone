import { execSync }from 'child_process'

jest.setTimeout(10000)

describe('test dclone', () => {
    test('expect ssr-with-loadable can be download', async () => {
        execSync('ts-node ../src/index https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable')
    })
})
