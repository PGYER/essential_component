# NotificationBar

## 概述

`NotificationBar` 定义消息弹出框

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

`NotificationBar` 不包含额外的 `l18n` 设置和内容

## a11y

`NotificationBar` 不包含额外的 `a11y` 设置和内容

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 使用

1. 引入

```javascript

  import NotificationBar from '@pgyer/essential-component/NotificationBar'

```

2. 调用

```jsx

  <NotificationBar key={0} open={false} onClose={(e) => close()} message='消息内容' />

```

## 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
| :---- | :---- | :---- | :---- |
| key  | Number | 0 | key值 |
| level  | Number | 0 | 错误等级: 从 0-2 分别是 提示、警告、错误 三个级别。输入其他数值均为警告级别 |
| offset  | Number | 0 | 消息偏移, 用于错开多个消息重复显示的情况。是一个不小于 0 的整数。其它输入和输入 1 等效 |
| anchorOrigin  | Object | { vertical: 'top', horizontal: 'right' } | 显示位置 |
| open  | Boolean | False | 消息框弹出状态 |
| onClose  | Function | null | 消息框关闭时执行的事件 |
| message  | String | '' | 消息框提示内容 |
| action  | Object | '' | 消息框尾部显示内容 |
