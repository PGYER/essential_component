# DateTimePicker

## 概述

日期时间选择器 `DateTimePicker`, 提供日期和时间的选择

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

## a11y

DateTimePicker 组件没有易用性选项。

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 使用

1. 引入

```javascript

import DatePicker from '@pgyer/essential-component/DateTimePicker'

```

2. 调用

```jsx

<DateTimePicker
  time={1662704852997}
  divideTime={1662704852997}
  divideType='before'
  onChange={data => console.log(data)}
  language='zh-cn'
/>

```

## 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
| :---- | :---- | :---- | :---- |
| time | Number | 时间 | 毫秒时间戳 |
| divideTime | Number | 分隔时间 | 毫秒时间戳 |
| divideType  | String | undefined | 分隔类型，只能选择分割时间前(divideType='before')、只能选择分割时间前(divideType='after') |
| onChange  | Func | 选择后回调 | 提供{start: timestamp, end: timestamp} |
| language  | String | 语言 | zh-cn、en-us |
