English | [简体中文](./README_zh-CN.md)

# Download specified directory in github/gitlab

<a href="https://circleci.com/gh/ykfe"><img src="https://img.shields.io/circleci/build/github/ykfe/dclone/master.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/ykfe/dclone"><img src="https://codecov.io/gh/ykfe/dclone/branch/master/graph/badge.svg" alt="Coverage Status"></a>
<a href="https://npmcharts.com/compare/dclone"><img src="https://img.shields.io/npm/dt/dclone" alt="download"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a>
<a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="License"></a>
<a href="https://github.com/ykfe/egg-react-ssr"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<img src="https://img.shields.io/badge/node-%3E=8-green.svg" alt="Node">

dclone is the simplest command for downloading specified directory or whole repo in github/gitlab (used depend on git), dclone can completely replace `git clone` and cut down download time

## Features

Let me introduce some awesome features in dclone

- quickly: you can only download single folder and cut down download time
- overall: dclone can download both github and gitlab
- simple: you only need copy http link in location

![](./image/time.jpg)

## How to use

it's very simple, you only need find github url of the directory，like `https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable`

![](./image/example.png)

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

You can also import dclone in files direct

```js
import { dclone } from 'dclone'

await dclone('https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable')
```

![](./image/dg.png)