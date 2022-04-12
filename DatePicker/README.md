# DatePicker

## 概述

日期选择器 `DatePicker`, 提供日期、日期范围的选择

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

DatePicker 组件没有易用性选项。

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 使用

1. 引入

```javascript

import DatePicker from '@pgyer/essential-component/DatePicker'

```

2. 调用

```jsx

<DatePicker
  mode='range'
  divideDate={1599091200000}
  divideType='before'
  startDate={1599091200000}
  endDate={1599264000000}
  onChange={data => console.log(data)}
  language='zh-cn'
/>

```

## 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
| :---- | :---- | :---- | :---- |
| mode  | String | undefined | 选择器模式，正常选择(不配置)、范围选择(mode='range') |
| divideDate | Number | 分界时间 | 数字 |
| divideType  | String | undefined | 选择器模式，正常选择(不配置)、分界时间以前可选(divideType='before')、分界时间以后可选(divideType='after') |
| startDate | Number | 开始日期 | 毫秒时间戳 |
| endDate | Number | 结束日期 | 毫秒时间戳 |
| onChange  | Func | 选择后回调 | 正常选择提供{date: timestamp}, 范围选择提供{start: timestamp, end: timestamp} |
| language  | String | 语言 | zh-cn、en-us |
