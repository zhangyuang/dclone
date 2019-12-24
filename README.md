English | [简体中文](./README_zh-CN.md)

# Download specified directory in github

<a href="https://circleci.com/gh/ykfe"><img src="https://img.shields.io/circleci/build/github/ykfe/dclone/master.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/ykfe/dclone"><img src="https://codecov.io/gh/ykfe/dclone/branch/master/graph/badge.svg" alt="Coverage Status"></a>

dclone is the simplest command in github to download specified directory in github (used depend on git), use dclone command can cut down download time

![](./image/time.png)

## How to use

it's very simple, you only need find github url of the directory，like `https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable`

![](./image/example.png)

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

![](./image/dg.png)