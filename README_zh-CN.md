简体中文 | [English](./README.md)

# 下载github/gitlab中指定的文件夹

<a href="https://circleci.com/gh/ykfe"><img src="https://img.shields.io/circleci/build/github/ykfe/dclone/master.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/ykfe/dclone"><img src="https://codecov.io/gh/ykfe/dclone/branch/master/graph/badge.svg" alt="Coverage Status"></a>
<a href="https://npmcharts.com/compare/dclone"><img src="https://img.shields.io/npm/dt/dclone" alt="download"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a>
<a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="License"></a>
<a href="https://github.com/ykfe/egg-react-ssr"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<img src="https://img.shields.io/badge/node-%3E=8-green.svg" alt="Node">

dclone是最简单的命令去下载github/gitlab仓库中指定的文件夹或者整个仓库(使用依赖git)，使用上可以完全替代`git clone`, 你可以用它来缩短你的下载速度

## 特性

让我们来介绍一下dclone有哪些特点吧

- 你可以只下载单独的一个文件夹大大缩短你的下载速度
- 全面，同时兼容github和gitlab
- 简单，你只需要复制地址栏的链接即可

![](./image/time.jpg)

## 如何使用

非常简单，你只需要找到你需要下载的文件夹的github url地址即可

![](./image/example.png)

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

![](./image/dg.png)