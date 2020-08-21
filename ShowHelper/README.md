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

3. 在 `public/index.html` 文件中添加以下代码集成 `工单助手`，其中 `product` 和 `color` 参数的设置需要询问 `工单项目的研发同学`

```html

<script type="text/javascript">
  (function(m, ei, q, i, a, l, h, j, s, c, b) {
      m[a] = m[a] || function() {
    (m[a].a = m[a].a || []).push(arguments)
      };
      c = ei.createElement(l);
      b = ei.getElementsByTagName(l)[0];
      c.href = h;
      c.setAttribute('rel', "stylesheet");
      b.parentNode.insertBefore(c, b);
      j = ei.createElement(q),
      s = ei.getElementsByTagName(q)[0];    
      j.async = true;    
      j.src = i;    
      s.parentNode.insertBefore(j, s)
  })(window, document, 'script',  'https://kf.pgyer.com/dist/smart-online.js', '_INITWORKORDER', 'link', 'https://kf.pgyer.com/dist/smart-online.css');
  _INITWORKORDER('environment', '');
  _INITWORKORDER('product', '{--- product ID ---}');
  _INITWORKORDER('lang', (window.localStorage && window.localStorage.getItem('lang') === 'en-us') ? 2 : 1);
  _INITWORKORDER('color', '{--- prohect primary color ---}');
</script>

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
| title  | String | label.learnMore 对应的文本 | title 文本 |
| tooltip  | String | label.learnMore 对应的文本 | tooltip 出现的文本 |
| type  | String | 'link' | 显示模式。'icon': 只显示一个图标； 'button': 显示图标和 title 文本组成的按钮; 'link': 显示为以 title 文本为内容的链接 |
