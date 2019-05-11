# Dva.js 入门级教学文档

总体介绍本文的框架

- 一、介绍
- 二、环境搭建和使用
- 三、全局架构
- 四、Model 包下文件架构
- 五、connect 连接 Model 和 Route 页面下的数据
- 六、数据显示和操作的流程
- 七、初始化数据 和 Model 数据比对
- 八、稍复杂概念

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

```js
import dva from 'dva';

// 1、创建 dva 实例
const app = dva();

// 2、装载插件 (可选)
app.use(require('dva-loading')());

// 3、注册 Model
app.model(require('./models/example'));

// 4、配置路由
app.router(require('./router'));

// 5、启动应用
app.start('#root');
```

通过上面的代码块，应该就可以很清楚了了解到 Dva 的5个 API

如果还不清楚，没关系，下面我一一讲解：

#### 1、创建 dva 实例

用于创建应用，返回 dva 实例，**dva 支持多实例**，如：

```js
const app = dva({
     history,
     initialState,
     onError,
     onAction,
     onStateChange,
     onReducer,
     onEffect,
     onHmr,
     extraReducers,
     extraEnhancers,
});
```

但是鉴于我只用过 `initialState`,就拿 `initialState` 来说。

`initialState` 为初始化数据，后面会**讲解它和 `model` 中 `state` 的区别**。大家可以在留心观看哈。

每个页面初始化的数据都将放在这里。并且 `initialState` 对象下的命名方式为：每个 **`model` 的 `namespce`**

如果命名不规范，数据是初始化不到页面上的。

#### 2、装载插件

需要任何样式的插件以上面的形式编写代码即可。

如果不需要任何插件，这段代码都可以直接省略。

上面引用的插件是：页面还未加载完毕时显示的 `loading` 图标，加上了上面那行插件代码，你就不要每个页面都写 `showloading` 和 `hideloading` 了。

#### 3、注册 Model

你每创建出来的一个 `model` **都需要来全局 `index.js` 来注册一下**，这样 `model` 层才能用。

Model 层的代码是重点，会放到下面的**第四大点**重点讲解。这里只是告诉大家要注册一下。

#### 4、配置路由

细心的小伙伴会发现在 `index.js` 同级目录下有一个 `router.js`,这里的配置路由就是配置这个页面的东西。下面**第2小点马上就讲解**，这里只是告诉大家，如何引用配置好的路由。

#### 5、启动应用

启动应用不解释。

### 2、router.js

打开 `router.js` 你就看到如下的代码：

```js
import IndexPage from './routes/IndexPage';
import HomePage from './routes/HomePage';

<Router history={history}>
    <Switch>
    <Route path="/" exact component={IndexPage} />
        .
        .
        .
    <Route path="/home" exact component={HomePage} />
    </Switch>
</Router>
```

#### 使用

我们每创建出来的一个页面，都需要在这里配置路由。

`path`:为页面的路径名称,注意：**要加上前缀斜杠**。命名可以随意，不过一般以创建页面的名字命名，这样比较清楚。

`component`:为代码最上方导入的页面。

上面我写了一个 `home` 页面的例子，供大家参考。

#### 解释一下

每个路由器都会创建一个 `history` 对象，并用其保持追踪当前 `location` 并在有变化的时候进行重新渲染。

`location`:是一个含有描述 URL 不同部分属性的对象。

来看一下 Dva官网的解释：这里的路由通常指的是前端路由，由于我们的应用现在通常是单页应用，所以我们需要前端代码来控制路由逻辑，同茶馆浏览器提供的 [History API](https://dvajs.com/guide/concepts.html#subscription)可以监听浏览器url的变化，从而控制路由相关操作。

dva 使用的是 `react-router` 来控制路由。

小伙伴们如果想深入学习路由这块的内容可以找度娘搜索：`react router` 学习哈。

### 3、components 包

一般为我们创建出来的公共组件。

### 4、routes 包

这里我们可以理解为 `pages`。你所要显示出来的页面都写在这个下面。 

### 5、services 包

为后台调用服务端接口的包，不做解释。

### 6、utils 包

这个包可以用来存放一些公共方法。需要使用时，导入 `js`,直接使用方法即可。

### 6、models 包

`models` 包用来存放 所有的 `model` 文件。

一个完整的 `model` 文件的架构：

```js
export defalut {
    namespace:'',
    state:{},
    reducers:{},
    effects:{},
    subscriptions:{},
}
```

好了。马上进入我们的 `Model` 文件结构专题。

## 四、Model 包下文件架构(重点)

### 1、namespace

官网解释：当前 Model 的名称。整个应用的 State,由多个 Model 的 State 以 `namespace` 为 key 合成的。

官网解释很绕，通俗的说：就是给每个 Model 一个命名用作 key 的标识。一般命名方式等于 Model `js` 的 文件名，举个例子：

Model 文件 `home.js` 里 `namespace` 值可以设为：`home`

### 2、state

该 Model 当前的状态。每个 Model 的数据都保存在这里，这里的数据通过 Route 视图层的 `this.props`,直接显示在页面上。

这里的数据一改变，页面上的数据也将自动改变。

### 3、reducers

用来处理同步操作。如果不需要调接口时候，我们前台传递的 `action`(不懂的小伙伴不着急，下面有微讲解) 可以直接调用 `reducers` 里的方法。

上面说的同步是同步什么呢？同步该 Model 里面的 `state` 的数据。

打开项目中 models `example.js`。找到 `reducers`,我将他复制在下方，来讲解一下怎么创建 reducers 下的方法。

```js
reducers: {
    save1(state, action) {
        return { ...state, ...action.payload };
    },
    save2(state, action) {
        return { ...state, ...action.payload };
    },
},
```
#### 1、save

`save`:为一个普通方法的命名，可自行取名

#### 2、state

`state`:为当前 Model 下的所有 `state` 值，可以 `console.log(state)` 看一下输出就知道了。

#### 3、action

`action`:当前台页面需要进行数据操作时，就会创建一个 `action`,`action` 存放了传递过来需要对当前 `state` 进行改变的数据。

#### 4、payload

`payload`:就是 `action` 里传递过来的数据。可以 `console.log(action.payload)` 看一下输出就知道了。

#### 5、return

`return`：返回的是新的 `state`。等于舍弃了旧的 `state`,重新 `return` 一个新的 `state` 作为当前 Model 的 `state`。

一般情况下，我们要解开旧的 `state`,将它重新赋值给新的 `state`。`...state` 为 [ES6](http://es6.ruanyifeng.com/) 语法。

将操作完成得数据累加到 `return` 中。

同名的数据会覆盖，所以不用担心旧的 `state` 值会影响到新设置的值。

不同名的数据会追加。

### 4、effects

用来处理异步操作。如果需要调取接口的话，前台页面就需要调用 `effects` 里的方法。

将数据取出来，在传递给 `reducers` 里的方法进行数据操作和同步 `state`。

来看看例子：

```js
import { querySomething } from '@/services/api';

*query({ payload }, { call, put, select }) {
    const data = yield call(querySomething, payload);
    console.log(data)
    yield put({
    type: 'save1',
    payload: { name: data.text },
    });
},
```

#### 1、*

`*`:这个 `*` 符号，可能小伙伴们不熟悉，简单点，不管它，只要记住每个 `effects` 里方法前面都加上 `*` 即可。

稍微解释一下：

这表明它是一个异步函数，里面可以使用 `yield` 等待其他异步函数执行结果。

#### 2、query

`query`:方法名，自定义命名。不多解释。

#### 3、payload

`payload`:当前台页面需要进行数据操作时，就会创建一个 `action`,`action` 存放了传递过来需要对当前 `state` 进行改变的数据。

`payload` 就是存放在 `action` 里面的数据。可以 `console.log(payload)` 看输出的效果。

#### 4、call

`call`:与后台服务端接口进行交互。

第一个传参：后台服务器接口对应的名称。第二个参数：入参。

同行的 `data` 为出参。可以 `console.log(data)` 看输出的效果。

#### 5、put

`put`:用来发出事件，即 `action`。一般调用 `reducers` 下的方法进行同步数据。

`type`:该 Model 层里 `reducers` 下的方法名。

`payload`:参数的传递。

如此一来。我们就将服务端查出来的数据，传递给 `reducers` 进行同步数据的操作了。

#### 6、select

`select`:如果我们需要调用到其他 Model 层里面的 state值。那么我们就需要用 `select` 来进行操作。

```js
const homeName = yield select(state => state.home);
```

这样我们就可以取到名为 `home` 的 Model 层里面的 `state` 数据了。

### 5、subscription

这是订阅。我也不懂。

## 五、connect 连接 Model 和 Route 页面下的数据

## 六、数据显示和操作的流程

## 七、初始化数据 和 Model 数据比对

## 八、稍复杂概念

