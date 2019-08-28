# webpack 

现代 JavaScript 应用程序的静态模块打包器

## 概念

**核心概念**

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

#### 入口

指示 webpack 应该使用哪个模块作为构建其内部依赖图的开始

#### 出口

在那里输出所创建的 bundles 以及如何命名文件。

#### loader

处理那些非 JavaScript 文件， 将所有类型文件转化为有效模块

1、`test` 属性，标识出应该被对应的loader 进行转换的某个或某些文件

2、`use` 属性，进行转换时，应该使用哪个loader

#### 插件

从打包优化和压缩，一直到重新定义环境中的变量

```js
const path = require('path');               // node.js 核心模块，用于操作文件路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件 

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(_dirname, 'dist'),   // bundle 生成到哪里
    filename: 'my-first-webpack.bundle.js'  // 名称
  },
  module: {
    rules: [
      { test: '/\.txt$/', use: 'raw-loader' } 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```

## 入口起点

可以创建多个主入口，可多个依赖文件一起注入

```js
const config = {
  entry: {
    main: './path/to/my/entry/file.js',
  }
}
```

## 输出

如果有多个入口，可以使用占位符来确保文件具有唯一的名称

```js
const config = {
  entry: {
    app: './src/app.js',
    search; './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: _dirname + '/dist'
  }
}
```

## 模式(mode)

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化

支持 development、production.具体代码操作[请看](https://www.webpackjs.com/concepts/mode/) 

## loader

loader 用于对模块的源代码进行转换，可以使你在 import 或 ‘加载’ 模块时预处理文件。

可以将 ts -> js, 内联图 -> dataURL, js中 import css  如：`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader'},
      { test: /\.ts$/, use: 'ts-loader'}
    ]
  }
}
```

同时，一个 `test` 可以配置多个 `loader`

或者使用内联： 

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

loader 特性

- 支持链式传递
- 同步异步都行
- 运行在 node.js 中，并且能够执行任何操作
- 接受查询参数
- 可使用 options 对象进行配置
- 如 `package.json` 的 `main` 属性，或 `loader` 字段

## 插件

解决 loader 无法实现的其他事

在 `webpack.config.js` 配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件

plugins: [
  new webpack.optimize.UglifyJsPlugin(),
  new HtmlWebpackPlugin({template: './src/index.html'})
]
```
具体剖析请看[这里](https://www.webpackjs.com/concepts/plugins/)

## 模块

每个模块都具有比完整程序更小的接触面， 对于 node.js webpack 能够以各种方式表达依赖关系：

- es5 import
- commonjs require()
- amd define require
- css sass less
- url().   <img src=''/>

webpack 通过 loader 可以支持各种语言和预处理器便携模块，loader描述了 webpack 如何处理非JavaScript模块的代码

## 模块解析

1、绝对路径

已经取得文件的绝对路径，不需要进一步做解析

2、相对路径

使用 `import` 和 `require` 的资源文件所在目录被认为上下文目录，会添加此上下文目录，以产生模块的绝对路径

3、模块路径

模块将在 `resolve.modules` 中指定所在目录内搜索

可以替换初始模块路径， 此替换路径通过使用 alias 配置选项来创建一个别名

1、解析器将检查是否指向文件或目录，

如果路径具有文件扩展名，直接将文件打包

否则使用 [resolve.extensions] 为文件扩展名解析。

2、如果指向文件夹： 看是否包含 `package.json` 不论存在与否都按顺序查查找

具体查看[官网](https://www.webpackjs.com/concepts/module-resolution/)

## manifest

#### runtime

浏览器运行时，webpack 用来链接模块化的应用程序的所有代码

runtime: 在模块交互时，连接模块所需的加载和解析逻辑，包括浏览器中已加载模块的连接，懒加载模块的执行逻辑


# ----------官网教程-------------

## 起步

```bash
npm init -y         // 默认执行 yes
npm install webpack webpack-cli --save-dev  安装webpack-cli
```

创建 bundle 文件： ‘/dist’

将源代码(/src) 从分发代码(/dist) 中分离出来。

源代码：书写和编辑代码

分发代码： 构建过程中产生的代码最小化和优化后的输出目录

为什么要创建 bundle 文件：

`index.js` 文件执行前还依赖于页面引入的 `lodash`，但并未显式声明需要引入 `lodash`。

存在几个问题：

- 无法立即体现，脚本的执行依赖于外部扩展库
- 如果依赖不存在，或者引入顺序错误程序无法正常运行
- 引入无用，则下载无用代码
- 讲了这么多无非就是把lodash 从 htm 文件转换到 js 文件中，明确表明自身的依赖，避免打包未使用的模块

引入 `bundle` ：在 `index.js` 里打包 `lodash` 依赖，我们需要在本地安装 library `npm install --save lodash`

```js
 import _ from 'lodash';
```

显式要求 `lodash`必须存在，然后绑定为 `_` (没有全局作用域污染)

`npx webpack` 或在 `package.json` 添加 `build`

`npx webpack --config webpack.config.js`

## 管理资源

1、加载 css

`npm install --save-dev style-loader css-loader`

新增 `webpack.config.js`

在 module:{ rules: []} 中增加正则来辨别 css 文件

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}, 
```

2、加载图片

`npm install --save-dev file-loader`

```js
{
  test: /\.(png|gif|svg|jpg)$/,
  use: [
    'file-loader'
  ]
}
```

3、字体

```js
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}
```

4、加载数据

`npm install --save-dev csv-loader xml-loader`

```js
{
  test: /\.(csv|tsv)$/,
  use: [
    'csv-loader'
  ]
},
{
  test: /\.xml$/,
  use: [
    'xml-loader'
  ]
}
```

## 管理输出

增加多个 `.js` 文件

HtmlWebpackPlugin: 自动帮你编辑 `index.heml` 的入口文件代码

还能帮我们修改标题

1、 设定 HtmlWebpackPlugin

`npm install --save-dev html-webpack-plugin`

在 `webpack.config.js` 中新增如下代码：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
    title: 'Output Management'
  })
]
```

2、清理 `/dist` 文件

`npm install clean-webpack-plugin --save-dev`

在 `webpack.config.js` 中新增如下代码：

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

plugins: [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    title: 'Output Management'
  })
]
```

## 开发(紧在开发环境中使用，不上生产)

报错位置更加精确

```js
devtool: 'inline-source-map',
```

如果能够在代码发生变化后自动编译代码就非常 nice 了。

- webpack's Watch Mode
- webpack-dev-server
- webpack-dev-middleware

1、使用观察模式

在 `package.json` 中添加 `"watch": "webpack --watch"`

运行 `npm run watch` 

缺点：为了看到修改后实际效果，需要刷新浏览器

2、webpack-dev-server

提供一个简单的 web 服务器，能够实时重新加载

`npm install --save-dev webpack-dev-server`

修改 `webpack.config.js` 告诉开发服务器在哪里查找文件

```js
devServer: {
  contentBase: './dist'
}
```

以上配置告知 `webpack-dev-server` 在 `localhost: 8080` 下建立服务，将 dist 目录下文件作为可访问文件

添加 `start` 脚本，可以直接运行开发服务器

`"start": "webpack-dev-server --open"`

3、使用 webpack-dev-middleware

这是一个容器。可以吧 webpack 处理后的文件传递给服务器 server

`webpack-dev-server` 在内部使用它，也可以作为一个单独的包来使用。

来一个 `webpack-dev-middleware` 配合 express server 事例

`npm install --save-dev express webpack-dev-middleware`

在 `webpack.config.js` `output` 加 `publicPath: '/'` 

## 模块热替换

修订 `webpack.config.js` 文件

```js
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true             // 新增
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }), 
    new webpack.NamedModulesPlugin(),       // 更容易查看修补依赖
    new webpack.HotModuleReplacementPlugin()  // 新增
  ],
}
```

## tree shaking

用于移除 js 上下文中未引用的代码

在 `package` 中添加 `"sideEffects": false`

也可以修改为一个数组, 添加进来则可不会被修改

```js
{
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

除了删除未用代码，还要压缩输出

`webpack.config.js`: `mode: "production"`

## 生产环境构建

开发和生产的差别：

开发：强大的，具有实时重新加载或热模块替换能力的sourcemap 和 localhost server

生产：更小的 bundle, 更轻量 sourcemap, 更优化的资源，改善加载时间，

`npm install --save-dev webpack-merge`

将通用配置合并在一起，不必在环境特定的配置汇总重复代码。

新增：

`webpack.common.js`、`webpack.dev.js`、`webpack.prod.js`

dev: 

```js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

prod:

```js
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});
```

重新定义 script

```json
"start": "webpack-dev-server --open --config webpack.dev.js"

"build": "webpack --config webpack.prod.js"
```

关于生产和开发中对于 source map 的引用

生产：`devtool: 'source-map'`

开发：`devtool: 'inline-source-map',` 增加 bundle 大小，降低整体性能

## 代码分离

在开发环境中，防止重复代码


在 `webpack.config.js` 中

```js
const webpack = require('webpack');

// 在 plugins 中新增
new webpack.optimize.CommonsChunkPlugin({
  name: 'common'
})
```

会多打出一个 `common.bundle.js` 的包 





