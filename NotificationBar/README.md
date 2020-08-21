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

// Process Module JSX with Babel.
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appNodeModules.concat('/@pgyer/essential-component'),
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    plugins: [
      '@babel/plugin-transform-react-jsx',
    ],
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
},

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
| anchorOrigin  | Object | { vertical: 'top', horizontal: 'right' } | 显示位置 |
| open  | Boolean | False | 消息框弹出状态 |
| onClose  | Function | null | 消息框关闭时执行的事件 |
| message  | String | '' | 消息框提示内容 |
| action  | Object | '' | 消息框尾部显示内容 |