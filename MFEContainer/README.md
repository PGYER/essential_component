# MFEContainer

## 概述

`MFEContainer` 定义了一个微前端容器，用于装载微前端项目页面

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

3. 待装载项目设置: appID

需要在待装载项目的 package.json 设置 appID。

```json

{
  "name": "kf",
  "appID": "_pgyer_kf_",
  ...
}

```

找到 `webpack` 找到 `output` 配置，设置以下代码。

```javascript

output: {
    ...
    libraryTarget: 'window',
    library: appPackageJson.appID,
    jsonpFunction: `webpackJsonp${appPackageJson.appID}`,
    globalObject: 'this',
    ...
}

```

4. 待装载项目设置: 生命周期控制，路由传递 和 Hooks

待装载项目需要在 `index.js` 暴露生命周期 `hooks` 用于装载和卸载页面。装载页面时，`MFEContainer` 会传入用于业务的 `hooks` 来进行应用间数据通信。

options 属性列表

| 名称 | mount 时包含 | unmount 时包含 | 类型 | 含义 |
| :- | :- | :- | :- | :- |
| anchor | O | O | String | 用户装载应用的 DOM 的选择器字符串 |
| route | O | X | String | 应用初始化时的路由 |
| hooks | O | X | Object | 应用间通信的 hooks |


index.js 需要暴露的属性, 具体函数应该替换为控制应用装载卸载的函数。

```javascript

export const hooks = {
  mount: (options) => {},
  unmount: (options) => {},
  setLanguage: (lang) => {} // 可选，子应用注册这个用来感知父应用语言变化。
}

```

5. 待装载项目设置: 网络请求可以发送到容器应用域名下以避免跨域请求

待装载项目应用应当可以探测自己是否被装载在微前端容器中，如果被装载在微前端容器中，可以修改网络请求为 `/{appID}/` 以避免跨域请求。

```javascript

endpoint = detectMFEMode() ? '/' + Constants.AppID + endpoint : endpoint

```

容器应用应该将自己的 appID 注册到全局变量中, 以便于待装载项目应用可以探测自己是否被装载在微前端容器中。

```javascript

window.__HOST_APP_ID__ = {appID};

```

6. 容器应用服务器设置: 提供 nginx 转发策略

容器应用服务器需要将 所有以 `/{appID}/` 开头的请求路由到容器应用实际服务器上。

```conf

location ~ ^/_pgyer_id_/ {
    rewrite /_pgyer_id_(.*) /$1 break;
    proxy_pass http://id.pgyer.yunhuiju.com;
}

```

## l18n

`MFEWrapper` 不包含额外的 `l18n` 设置和内容

## a11y

`MFEWrapper` 不包含额外的 `a11y` 设置和内容

## 使用

> 注意: 需要配合 &lt;MuiThemeProvider /&gt; 使用

1. 引入

```javascript

  import Helper from '@pgyer/essential-component/MFEContainer'

```

2. 调用

```jsx

  <MFEContainer
    appID='_pgyer_seed_'
    appPath='workspace/index.html'
    route={'/release/doc/' + this.props.docKey}
    hooks={this.hooks}
  />

```

## 属性列表

| 属性名 | 类型 | 默认值 | 说明 |
| :---- | :---- | :---- | :---- |
| appID  | String | '' | 被加载应用 appID |
| appPath  | String | '' | 被加载应用 html entry |
| route  | String | '' | 初始化路由 |
| hooks  | Object | null | 应用间通信 hooks |
