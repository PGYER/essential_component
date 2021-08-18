# ShowHelper

## 概述

`ShowHelper` 提供文档及提交工单入口。在项目中提供访问 `Seed` 文档的入口。点击 `ShowHelper` 组件即可弹出对应知识库里的文档。

## 安装和配置

1. 使用 `yarn` 或 `npm` 安装组件包

```shell

yarn add git+ssh:git@codefever.pgyer.com:PGYER/essential_component.git@latest
yarn upgrade @pgyer/essential-component

```

2. 配置 webpack Loader

找到 `webpack` 配置, 找到 `module` 配置, 找到 `rules` 后, 在包含 `oneOf` 的配置中加入如下代码

```javascript

// 老版本 create-react-app, 可能是这样的
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appNodeModules.concat('/@pgyer/essential-component'),
  loader: require.resolve('babel-loader'),
...

// 升级新版 create-react-app 以后, 可能是这样的
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: [
    paths.appSrc,
    paths.appNodeModules.concat('/@pgyer/essential-component')
  ],
  loader: require.resolve('babel-loader'),
...

```

## l18n

ShowHelper 组件需要使用语言包显示默认文本。

需要在语言包内设置 `label.learnMore` 为相应的提示语言。 (了解更多 或者 learn more)

## a11y

ShowHelper 组件没有易用性选项。

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 和 &lt;IntlProvider /&gt; 使用

1. 引入

```javascript

import ShowHelper from '@pgyer/essential-component/ShowHelper'

```

2. 调用

```jsx

<ShowHelper docID='' />

```

## 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
| :---- | :---- | :---- | :---- |
| docID  | String | '' | Seed 上的 DocID |
| appID  | String | '' | KF 上的 Doc 分类用来确定 Doc 来源, 如果不填写则由当前 KF Session 所在 app 决定 |
| title  | String | label.learnMore 对应的文本 | title 文本 |
| tooltip  | String | label.learnMore 对应的文本 | tooltip 出现的文本 |
| type  | String | 'link' | 显示模式。'icon': 只显示一个图标； 'button': 显示图标和 title 文本组成的按钮; 'link': 显示为以 title 文本为内容的链接 |
