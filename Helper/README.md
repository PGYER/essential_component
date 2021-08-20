# Helper

## 概述

`Helper` 定义了一个源自于工单系统的快速帮助窗口，可以快速搜索、显示 Seed 文档，并且可以直接在当前页面提交工单。

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

3. nginx 转发配置

由于文档系统依赖了 MFEContainer 组件并链接工单服务，需要在集成方 nginx 上设置功能与如下类似的转发。

```conf

location ~ ^/_pgyer_kf_/ {
    rewrite /_pgyer_kf_(.*) /$1 break;
    proxy_pass http://kf.pgyer.yunhuiju.com;
}

location ~ ^/_pgyer_seed_/ {
    rewrite /_pgyer_seed_(.*) /$1 break;
    proxy_pass http://wiki.pgyer.yunhuiju.com;
}

```

## l18n

`Helper` 不包含额外的 `l18n` 设置和内容

## a11y

`Helper` 不包含额外的 `a11y` 设置和内容

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 使用

1. 引入

```javascript

  import Helper from '@pgyer/essential-component/Helper'

```

2. 调用

```jsx

  <Helper />

```

## 属性列表

本组件无其它属性
