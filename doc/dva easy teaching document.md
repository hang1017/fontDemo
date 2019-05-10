# Dva.js 入门级教学文档

总体介绍本文的框架

- 一、介绍
- 二、环境搭建和使用
- 三、全局架构
- 四、models 包下文件架构
- 五、初始化数据 和 models 数据比对
- 六、稍复杂概念

## 一、介绍

### 1、什么是 dva

React 应用级框架，将 React-Router + Redux + Redux-saga 三个 React 工具库包装在一起，简化了 API，让开发 React 应用更加方便和快捷

简单理解：dva = React-Router + Redux + Redux-saga

### 2、dva 的作用是什么

## 二、环境搭建和使用

### 1、环境搭建

```bash
$ npm install dva-cli -g    
$ dva -v                    //查看下是否安装成功，显示 dva 的版本号
dva-cli version 0.9.1
```

### 2、创建项目

```bash
$ dva new dva-1    //dva-1 为你创建项目的名称
```

安装成功后，`cd` 进入 `dva-1` 目录下，通过 `npm start` 和 `yarn start` 启动项目

如果启动报错的话，可以先执行 `npm i` 或者 `yarn`

### 3、使用 antd

在进入到项目目录下后，输入如下命令：

```bash
$ npm install antd babel-plugin-import --save
```

通过 `npm` 安装 `antd` 和 `babel-plugin-import`。`babel-plugin-import` 是用来按需加载 `antd` 的脚本和样式的。

**注意!!!!!** 

请在全局目录下找到 `.webpackrc` 文件，输入以下代码，使 `babel-plugin-import` 插件生效。

```js
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
+  ]
}
```

**再次强调：注意上面的插件生效的代码，不输入以上代码，按需加载 antd 插件不生效**

## 三、全局架构

```
.
├── mock    // mock数据文件夹
├── node_modules // 第三方的依赖
├── public  // 存放公共public文件的文件夹
├── src  // 最重要的文件夹，编写代码都在这个文件夹下
│   ├── assets // 可以放图片等公共资源
│   ├── components // 就是react中的木偶组件
│   ├── models // dva最重要的文件夹，所有的数据交互及逻辑都写在这里
│   ├── routes // 就是react中的智能组件，不要被文件夹名字误导。
│   ├── services // 放请求借口方法的文件夹
│   ├── utils // 自己的工具方法可以放在这边
│   ├── index.css // 入口文件样式
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── router.js // 项目的路由文件
├── .eslintrc // bower安装目录的配置
├── .editorconfig // 保证代码在不同编辑器可视化的工具
├── .gitignore // git上传时忽略的文件
├── .roadhogrc.js // 项目的配置文件，配置接口转发，css_module等都在这边。
├── .roadhogrc.mock.js // 项目的配置文件
└── package.json // 当前整一个项目的依赖
```

### 1、index.js(重点)



### 2、router.js

### 3、components 包

### 4、routes 包

### 5、services 包

### 6、utils 包

### 6、models 包

## 四、models 包下文件架构(重点)

### 1、namespace

### 2、state

### 3、effects

### 4、reducers

### 5、subscription

## 五、初始化数据 和 models 数据比对

## 六、稍复杂概念

